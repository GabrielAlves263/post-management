import { App } from "./src/app.js";

const PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
