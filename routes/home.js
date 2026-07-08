const homeView = require("../views/homeView");

module.exports = (app) => {

    // Publish Home Tab
    app.event("app_home_opened", async ({ event, client }) => {

        try {

            await client.views.publish({
                user_id: event.user,
                view: homeView()
            });

        } catch (err) {
            console.error("Home View Error:", err);
        }

    });

};
