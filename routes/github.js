module.exports = (receiver) => {

    receiver.app.post("/github/webhook", async (req, res) => {

        try {

            const payload = req.body;

            console.log("GitHub Webhook Received");

            console.log(payload);

            // TODO:
            // Send Slack notification
            // Example:
            // Repository Setup Completed
            // Workflow Failed
            // AI Fix Created
            // Pull Request Created

            res.status(200).send("Webhook Received");

        } catch (err) {

            console.error(err);

            res.status(500).send("Error");

        }

    });

};
