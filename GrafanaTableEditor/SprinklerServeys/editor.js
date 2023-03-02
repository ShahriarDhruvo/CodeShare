const TIMEOUT = 2000;
const SECONDARY_TIMEOUT = 500;
const loader = htmlNode.getElementById("spinner");
const fetchBtn = htmlNode.getElementById("fetch_btn");
const submitBtn = htmlNode.getElementById("submit_btn");
const SSCaseId = htmlNode.getElementById("SS_case_id");
/* Add new variables in this block */
const SSSocialNetwork = htmlNode.getElementById("SS_social_network");
const SSAssignedByGrp = htmlNode.getElementById("SS_assigned_by_grp");
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
    if (SSCaseId.value === "") {
        htmlNode.getElementById("error").style.display = "block";
    } else {
        // to trigger fetching data from DB
        SSCaseId.disabled = true;
        updateGrafanaVariable("FSS_case_id", SSCaseId.value);

        // hide any errors
        htmlNode.getElementById("error").style.display = "none";

        // show loading
        fetchBtn.disabled = true;
        loader.style.display = "inline-block";

        // wait for the data to be fetched from the DB
        setTimeout(() => {
            // get all data which has been fetched from the DB
            const fetchedData = JSON.parse(getGrafanaVariable("FSS_data"));

            console.log(fetchedData, "SED");
            // return;

            // if it's less or equal to zero then that means that record doesn't exist against that ID
            if (fetchedData.length === 0) {
                SSCaseId.disabled = false;
                htmlNode.getElementById("error").style.display = "block";
            } else {
                // update html fields with fetched data
                /* Add new variables in this block */
                SSSocialNetwork.value = fetchedData[6];
                SSAssignedByGrp.querySelector("input").value = fetchedData[4];
                /* Add new variables in this block */

                // show html input fields
                /* Add new variables in this block */
                SSSocialNetwork.style.display = "flex";
                SSAssignedByGrp.style.display = "flex";
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
    updateGrafanaVariable("USS_case_id", "");

    setTimeout(() => {
        // update variables by user inputs
        /* Add new variables in this block */
        updateGrafanaVariable("USS_social_network", SSSocialNetwork.value);
        "USS_assigned_by",
            updateGrafanaVariable(SSAssignedByGrp.querySelector("input").value);
        /* Add new variables in this block */

        // trigger update query to DB
        setTimeout(() => {
            // as this ID was previously null, by updating the variable previously
            // will not trigger a successful update because a null ID will throw an
            // error. I can update the ID after I make sure that all information has
            // been updated correctly and doing so will trigger a successful update to the DB
            updateGrafanaVariable("USS_case_id", SSCaseId.value);

            setTimeout(() => {
                // clear all variable to avoid any unnecessary bugs and
                // to force fetching new data from DB in next trigger
                updateGrafanaVariable("FSS_case_id", "");
                updateGrafanaVariable("USS_case_id", "");
                /* Add new variables in this block */
                updateGrafanaVariable("USS_assigned_by", "");
                updateGrafanaVariable("USS_social_network", "");
                /* Add new variables in this block */

                // clean html input fields to avoid showing previously fetched data
                SSCaseId.value = "";
                /* Add new variables in this block */
                SSSocialNetwork.value = "";
                SSAssignedByGrp.querySelector("input").value = "";
                /* Add new variables in this block */

                SSCaseId.disabled = false;

                // hide all html inputs
                /* Add new variables in this block */
                SSSocialNetwork.style.display = "none";
                SSAssignedByGrp.style.display = "none";
                /* Add new variables in this block */

                // hide loading
                submitBtn.disabled = false;
                loader.style.display = "none";

                // switch action buttons from 'Update Data' to 'Fetch Data'
                fetchBtn.style.display = "block";
                submitBtn.style.display = "none";
            }, TIMEOUT);
        }, SECONDARY_TIMEOUT);
    }, SECONDARY_TIMEOUT);
};
