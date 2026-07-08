module.exports = () => ({
    type: "modal",

    callback_id: "setup_repository_submit",

    title: {
        type: "plain_text",
        text: "Repository Setup"
    },

    submit: {
        type: "plain_text",
        text: "Submit"
    },

    close: {
        type: "plain_text",
        text: "Cancel"
    },

    blocks: [

        {
            type: "input",
            block_id: "repo_name",
            label: {
                type: "plain_text",
                text: "Repository Name"
            },
            element: {
                type: "plain_text_input",
                action_id: "repo_name",
                placeholder: {
                    type: "plain_text",
                    text: "Example: Test-repo"
                }
            }
        },

        {
            type: "input",
            block_id: "ci_workflow_name",
            label: {
                type: "plain_text",
                text: "CI Workflow Name"
            },
            element: {
                type: "plain_text_input",
                action_id: "ci_workflow_name",
                placeholder: {
                    type: "plain_text",
                    text: ".NET CI"
                }
            }
        },

        {
            type: "input",
            block_id: "ci_file_name",
            label: {
                type: "plain_text",
                text: "CI Workflow File"
            },
            element: {
                type: "plain_text_input",
                action_id: "ci_file_name",
                placeholder: {
                    type: "plain_text",
                    text: "dotnet.yml"
                }
            }
        },

        {
            type: "input",
            block_id: "target_branch",
            optional: true,
            label: {
                type: "plain_text",
                text: "Target Branch"
            },
            element: {
                type: "plain_text_input",
                action_id: "target_branch",
                initial_value: "main"
            }
        },

        {
            type: "input",
            block_id: "fix_branch_name",
            optional: true,
            label: {
                type: "plain_text",
                text: "Fix Branch"
            },
            element: {
                type: "plain_text_input",
                action_id: "fix_branch_name",
                initial_value: "AI_FIX"
            }
        }

    ]
});
