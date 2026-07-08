module.exports = () => ({
    type: "home",
    callback_id: "home_view",
    blocks: [
        {
            type: "header",
            text: {
                type: "plain_text",
                text: "🤖 AI Workflow Bot"
            }
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text:
                    "*Welcome!*\n\nUse this app to onboard a repository with AI-powered GitHub Actions."
            }
        },
        {
            type: "divider"
        },
        {
            type: "actions",
            elements: [
                {
                    type: "button",
                    action_id: "setup_repo",
                    text: {
                        type: "plain_text",
                        text: "🚀 Setup Repository"
                    },
                    style: "primary"
                }
            ]
        },
        {
            type: "divider"
        },
        {
            type: "context",
            elements: [
                {
                    type: "mrkdwn",
                    text:
                        "This triggers *setup.yml* in the *ai-workflows* repository."
                }
            ]
        }
    ]
});
