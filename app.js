require("dotenv").config();

const { App, ExpressReceiver } = require("@slack/bolt");

// Views
const homeView = require("./views/homeView");
const setupModal = require("./views/setupModal");

// Services
const githubService = require("./services/githubService");

// ----------------------------------------------------
// Slack Receiver
// ----------------------------------------------------

const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

// ----------------------------------------------------
// Slack App
// ----------------------------------------------------

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver
});

// ----------------------------------------------------
// Home Tab
// ----------------------------------------------------

app.event("app_home_opened", async ({ event, client }) => {

    try {

        await client.views.publish({
            user_id: event.user,
            view: homeView()
        });

    } catch (err) {
        console.error(err);
    }

});

// ----------------------------------------------------
// Setup Button
// ----------------------------------------------------

app.action("setup_repo", async ({ ack, body, client }) => {

    await ack();

    try {

        await client.views.open({
            trigger_id: body.trigger_id,
            view: setupModal()
        });

    } catch (err) {
        console.error(err);
    }

});

// ----------------------------------------------------
// Modal Submit
// ----------------------------------------------------

app.view("setup_repository_submit", async ({ ack, body, view, client }) => {

    await ack();

    try {

        const values = view.state.values;

        const repo_name =
            values.repo_name.repo_name.value;

        const ci_workflow_name =
            values.ci_workflow_name.ci_workflow_name.value;

        const ci_file_name =
            values.ci_file_name.ci_file_name.value;

        const target_branch =
            values.target_branch.target_branch.value || "main";

        const fix_branch_name =
            values.fix_branch_name.fix_branch_name.value || "AI_FIX";

        console.log("Received setup request:");

        console.log({
            repo_name,
            ci_workflow_name,
            ci_file_name,
            target_branch,
            fix_branch_name
        });

        //------------------------------------------------
        // Trigger GitHub Workflow
        //------------------------------------------------

        const result = await githubService.triggerSetupWorkflow({

            repo_name,

            ci_workflow_name,

            ci_file_name,

            target_branch,

            fix_branch_name

        });

        //------------------------------------------------
        // Notify User
        //------------------------------------------------

        await client.chat.postMessage({

            channel: body.user.id,

            text:
`✅ AI Repository Setup Started

Repository : ${repo_name}

Workflow : ${ci_workflow_name}

Target Branch : ${target_branch}

Fix Branch : ${fix_branch_name}

GitHub Run ID : ${result.runId || "Triggered"}

🚀 Your setup.yml workflow has been dispatched successfully.`

        });

    } catch (err) {

        console.error(err);

        await client.chat.postMessage({

            channel: body.user.id,

            text:
`❌ Failed to trigger setup workflow.

${err.message}`

        });

    }

});

// ----------------------------------------------------
// Health Check
// ----------------------------------------------------

receiver.app.get("/", (req, res) => {

    res.send("Slack AI Bot is running.");

});

// ----------------------------------------------------
// Start Server
// ----------------------------------------------------

(async () => {

    const port = process.env.PORT || 3000;

    await app.start(port);

    console.log("==================================");
    console.log("Slack AI Bot Started");
    console.log(`Running on port ${port}`);
    console.log("==================================");

})();
