const axios = require("axios");

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPOSITORY;
const WORKFLOW = process.env.GITHUB_WORKFLOW_FILE;
const REF = process.env.GITHUB_WORKFLOW_REF;

async function triggerSetupWorkflow(data) {

    const url =
        `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW}/dispatches`;

    const body = {

        ref: REF,

        inputs: {

            repo_name: data.repo_name,

            ci_workflow_name: data.ci_workflow_name,

            ci_file_name: data.ci_file_name,

            target_branch: data.target_branch,

            fix_branch_name: data.fix_branch_name

        }

    };

    console.log("Dispatch URL:", url);
    console.log("Payload:", body);

    await axios.post(
        url,
        body,
        {
            headers: {
                Authorization: `Bearer ${process.env.PAT_TOKEN }`,
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28"
            }
        }
    );

    return {
        success: true,
        runId: null
    };
}

module.exports = {
    triggerSetupWorkflow
};
