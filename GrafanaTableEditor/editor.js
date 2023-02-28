const TIMEOUT = 2000;
const loader = htmlNode.getElementById("spinner");
const fetchBtn = htmlNode.getElementById("fetch_btn");
const submitBtn = htmlNode.getElementById("submit_btn");
const sprinklerServeyId = htmlNode.getElementById("sprinkler_servey_id");
/* Add new variables in this block */
const sprinklerServeyLang = htmlNode.getElementById("sprinkler_servey_lang");
const sprinklerServeyTextGrp = htmlNode.getElementById(
    "sprinkler_servey_text_grp"
);
/* Add new variables in this block */

const getGrafanaVariable = (variableName) => {
    return getTemplateSrv().replace(`$${variableName}`, {}, "json");
};

const updateGrafanaVariable = (variableName, value) => {
    htmlGraphics.locationService.partial(
        {
            [`var-${variableName}`]: value,
        },
        true
    );
};

fetchBtn.onclick = () => {
    if (sprinklerServeyId.value === "") {
        htmlNode.getElementById("error").style.display = "block";
    } else {
        // to trigger fetching data from DB
        sprinklerServeyId.disabled = true;
        updateGrafanaVariable(
            "fetch_sprinkler_servey_id",
            sprinklerServeyId.value
        );

        // hide any errors
        htmlNode.getElementById("error").style.display = "none";

        // show loading
        fetchBtn.disabled = true;
        loader.style.display = "inline-block";

        // wait for the data to be fetched from the DB
        setTimeout(() => {
            // get all data which has been fetched from the DB
            const fetchedData = JSON.parse(
                getGrafanaVariable("fetch_sprinkler_servey_data")
            );

            // if it's less or equal to zero then that means that record doesn't exist against that ID
            if (fetchedData.length === 0) {
                sprinklerServeyId.disabled = false;
                htmlNode.getElementById("error").style.display = "block";
            } else {
                // update html fields with fetched data
                /* Add new variables in this block */
                sprinklerServeyLang.value = fetchedData[6];
                sprinklerServeyTextGrp.querySelector("textarea").value =
                    fetchedData[4];
                /* Add new variables in this block */

                // show html input fields
                /* Add new variables in this block */
                sprinklerServeyLang.style.display = "flex";
                sprinklerServeyTextGrp.style.display = "flex";
                /* Add new variables in this block */

                // switch action buttons from 'Fetch Data' to 'Update Data'
                fetchBtn.style.display = "none";
                submitBtn.style.display = "block";
            }

            // enable button & hide loading
            fetchBtn.disabled = false;
            loader.style.display = "none";
        }, TIMEOUT);
    }
};

submitBtn.onclick = () => {
    // disable button & show loading
    submitBtn.disabled = true;
    loader.style.display = "inline-block";

    // to prevent accidentaly updating info by previous ID
    updateGrafanaVariable("update_sprinkler_servey_id", "");

    setTimeout(() => {
        // update variables by user inputs
        /* Add new variables in this block */
        updateGrafanaVariable(
            "updated_sprinkler_servey_lang",
            sprinklerServeyLang.value
        );
        updateGrafanaVariable(
            "updated_sprinkler_servey_content",
            sprinklerServeyTextGrp.querySelector("textarea").value
        );
        /* Add new variables in this block */

        // trigger update query to DB
        setTimeout(() => {
            // as this ID was previously null, by updating the variable previously
            // will not trigger a successful update because a null ID will throw an
            // error. I can update the ID after I make sure that all information has
            // been updated correctly and after updating the ID it will trigger a
            // successful update to the DB
            updateGrafanaVariable(
                "update_sprinkler_servey_id",
                sprinklerServeyId.value
            );

            setTimeout(() => {
                // clear all variable to avoid any unnecessary bugs and
                // to force fetching new data from DB in next trigger
                updateGrafanaVariable("fetch_sprinkler_servey_id", "");
                updateGrafanaVariable("update_sprinkler_servey_id", "");
                /* Add new variables in this block */
                updateGrafanaVariable("updated_sprinkler_servey_lang", "");
                updateGrafanaVariable("updated_sprinkler_servey_content", "");
                /* Add new variables in this block */

                // clean html input fields to avoid showing previously fetched data
                sprinklerServeyId.value = "";
                /* Add new variables in this block */
                sprinklerServeyLang.value = "";
                sprinklerServeyTextGrp.querySelector("textarea").value = "";
                /* Add new variables in this block */

                sprinklerServeyId.disabled = false;

                // hide all html inputs
                /* Add new variables in this block */
                sprinklerServeyLang.style.display = "none";
                sprinklerServeyTextGrp.style.display = "none";
                /* Add new variables in this block */

                // hide loading
                submitBtn.disabled = false;
                loader.style.display = "none";

                // switch action buttons from 'Update Data' to 'Fetch Data'
                fetchBtn.style.display = "block";
                submitBtn.style.display = "none";
            }, TIMEOUT);
        }, 500);
    }, 500);
};
