const setupModal = require("../views/setupModal");
const githubService = require("../services/githubService");

module.exports = (app) => {

    // Open Modal
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

    // Submit Modal
    app.view(
        "setup_repository_submit",
        async ({ ack, body, view, client }) => {

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

                const result =
                    await githubService.triggerSetupWorkflow({

                        repo_name,

                        ci_workflow_name,

                        ci_file_name,

                        target_branch,

                        fix_branch_name

                    });

                await client.chat.postMessage({

                    channel: body.user.id,

                    text:
`✅ AI Repository Setup Started

Repository : ${repo_name}

Workflow : ${ci_workflow_name}

Target Branch : ${target_branch}

Fix Branch : ${fix_branch_name}

Run : ${result.runId || "Triggered"}`

                });

            } catch (err) {

                console.error(err);

                await client.chat.postMessage({

                    channel: body.user.id,

                    text:
`❌ Failed to trigger workflow.

${err.message}`

                });

            }

        }

    );

};
