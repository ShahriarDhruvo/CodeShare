const DUMMY_PK = -1;
const TIMEOUT = 2000;
const SECONDARY_TIMEOUT = 500;
const loader = htmlNode.getElementById("spinner");
const fetchBtn = htmlNode.getElementById("fetch_btn");
const submitBtn = htmlNode.getElementById("submit_btn");
const cancelBtn = htmlNode.getElementById("cancel_btn");
const actionBtnGrp = htmlNode.getElementById("action_btn_grp");
const SSCaseId = htmlNode.getElementById("SS_case_id");
/* Add new variables in this block */
const SSAssignedByGrp = htmlNode.getElementById("SS_assigned_by_grp");
const SSSocialNetworkGrp = htmlNode.getElementById("SS_social_network_grp");
const SSDescriptionMessageGrp = htmlNode.getElementById(
    "SS_description_message_grp"
);
const SSDigitalResourceGrp = htmlNode.getElementById("SS_digital_resource_grp");
const SSCaseStatusGrp = htmlNode.getElementById("SS_case_status_grp");
const SSCPDigitalStatusGrp = htmlNode.getElementById(
    "SS_cp_digital_status_grp"
);
const SSLobGrp = htmlNode.getElementById("SS_lob_grp");
const SSMemberIdGrp = htmlNode.getElementById("SS_member_id_grp");
const SSMemberFullNameGrp = htmlNode.getElementById("SS_member_full_name_grp");
const SSConsumerFeedbackGrp = htmlNode.getElementById(
    "SS_consumer_feedback_grp"
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

const clearGrafanaVariables = () => {
    updateGrafanaVariable("FSS_case_id", DUMMY_PK);
    updateGrafanaVariable("USS_case_id", DUMMY_PK);

    /* Add new variables in this block */
    updateGrafanaVariable("FSS_case_id_recheck", DUMMY_PK);
    updateGrafanaVariable("FSS_assigned_by", "");
    updateGrafanaVariable("FSS_social_network", "");
    updateGrafanaVariable("FSS_description_message", "");
    updateGrafanaVariable("FSS_digital_resource", "");
    updateGrafanaVariable("FSS_case_status", "");
    updateGrafanaVariable("FSS_cp_digital_status", "");
    updateGrafanaVariable("FSS_lob", "");
    updateGrafanaVariable("FSS_member_id", "");
    updateGrafanaVariable("FSS_member_full_name", "");
    updateGrafanaVariable("FSS_consumer_feedback", "");

    updateGrafanaVariable("USS_assigned_by", "");
    updateGrafanaVariable("USS_social_network", "");
    updateGrafanaVariable("USS_description_message", "");
    updateGrafanaVariable("USS_digital_resource", "");
    updateGrafanaVariable("USS_case_status", "");
    updateGrafanaVariable("USS_cp_digital_status", "");
    updateGrafanaVariable("USS_lob", "");
    updateGrafanaVariable("USS_member_id", "");
    updateGrafanaVariable("USS_member_full_name", "");
    updateGrafanaVariable("USS_consumer_feedback", "");
    /* Add new variables in this block */
};

const clearHTMLFields = () => {
    SSCaseId.value = "";
    /* Add new variables in this block */
    SSAssignedByGrp.querySelector("input").value = "";
    SSSocialNetworkGrp.querySelector("select").value = "";
    SSDescriptionMessageGrp.querySelector("textarea").value = "";
    SSDigitalResourceGrp.querySelector("select").value = "";
    SSCaseStatusGrp.querySelector("select").value = "";
    SSCPDigitalStatusGrp.querySelector("select").value = "";
    SSLobGrp.querySelector("select").value = "";
    SSMemberIdGrp.querySelector("input").value = "";
    SSMemberFullNameGrp.querySelector("input").value = "";
    SSConsumerFeedbackGrp.querySelector("textarea").value = "";
    /* Add new variables in this block */
};

const toggleView = (show) => {
    const display = show ? "flex" : "none";

    /* Add new variables in this block */
    SSAssignedByGrp.style.display = display;
    SSSocialNetworkGrp.style.display = display;
    SSDescriptionMessageGrp.style.display = display;
    SSDigitalResourceGrp.style.display = display;
    SSCaseStatusGrp.style.display = display;
    SSCPDigitalStatusGrp.style.display = display;
    SSLobGrp.style.display = display;
    SSMemberIdGrp.style.display = display;
    SSMemberFullNameGrp.style.display = display;
    SSConsumerFeedbackGrp.style.display = display;
    /* Add new variables in this block */

    // switch action button's view
    fetchBtn.style.display = show ? "none" : "block";
    actionBtnGrp.style.display = show ? "block" : "none";
};

const updateFromInputField = () => {
    /* Add new variables in this block */
    updateGrafanaVariable(
        "USS_social_network",
        SSSocialNetworkGrp.querySelector("select").value
    );
    updateGrafanaVariable(
        "USS_assigned_by",
        SSAssignedByGrp.querySelector("input").value
    );
    updateGrafanaVariable(
        "USS_description_message",
        SSDescriptionMessageGrp.querySelector("textarea").value
    );
    updateGrafanaVariable(
        "USS_digital_resource",
        SSDigitalResourceGrp.querySelector("select").value
    );
    updateGrafanaVariable(
        "USS_case_status",
        SSCaseStatusGrp.querySelector("select").value
    );
    updateGrafanaVariable(
        "USS_cp_digital_status",
        SSCPDigitalStatusGrp.querySelector("select").value
    );
    updateGrafanaVariable("USS_lob", SSLobGrp.querySelector("select").value);
    updateGrafanaVariable(
        "USS_member_id",
        SSMemberIdGrp.querySelector("input").value
    );
    updateGrafanaVariable(
        "USS_member_full_name",
        SSMemberFullNameGrp.querySelector("input").value
    );
    updateGrafanaVariable(
        "USS_consumer_feedback",
        SSConsumerFeedbackGrp.querySelector("textarea").value
    );
    /* Add new variables in this block */
};

const fillInputField = () => {
    /* Add new variables in this block */
    SSAssignedByGrp.querySelector("input").value =
        getGrafanaVariable("FSS_assigned_by");
    SSSocialNetworkGrp.querySelector("select").value =
        getGrafanaVariable("FSS_social_network");
    SSDescriptionMessageGrp.querySelector("textarea").value =
        getGrafanaVariable("FSS_description_message");
    SSDigitalResourceGrp.querySelector("select").value = getGrafanaVariable(
        "FSS_digital_resource"
    );
    SSCaseStatusGrp.querySelector("select").value =
        getGrafanaVariable("FSS_case_status");
    SSCPDigitalStatusGrp.querySelector("select").value = getGrafanaVariable(
        "FSS_cp_digital_status"
    );
    SSLobGrp.querySelector("select").value = getGrafanaVariable("FSS_lob");
    SSMemberIdGrp.querySelector("input").value =
        getGrafanaVariable("FSS_member_id");
    SSMemberFullNameGrp.querySelector("input").value = getGrafanaVariable(
        "FSS_member_full_name"
    );
    SSConsumerFeedbackGrp.querySelector("textarea").value = getGrafanaVariable(
        "FSS_consumer_feedback"
    );
    /* Add new variables in this block */
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
            const rchkId = JSON.parse(
                getGrafanaVariable("FSS_case_id_recheck")
            );

            // if it's equal to "" then that means that record doesn't exist against that ID
            if (rchkId === "" && rchkId !== SSCaseId.value) {
                SSCaseId.disabled = false;
                htmlNode.getElementById("error").style.display = "block";
            } else {
                // update html fields with fetched data
                fillInputField();

                // show html input fields
                toggleView(true);
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
    cancelBtn.disabled = true;
    loader.style.display = "inline-block";

    // to prevent accidentaly updating info by previous ID
    updateGrafanaVariable("USS_case_id", DUMMY_PK);

    setTimeout(() => {
        // update variables by user inputs
        updateFromInputField();

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
                clearGrafanaVariables();
                clearHTMLFields();

                SSCaseId.disabled = false;

                // hide all html inputs
                toggleView(false);

                // hide loading
                submitBtn.disabled = false;
                cancelBtn.disabled = false;
                loader.style.display = "none";
            }, TIMEOUT);
        }, SECONDARY_TIMEOUT);
    }, SECONDARY_TIMEOUT);
};

cancelBtn.onclick = () => {
    toggleView(false);
    clearHTMLFields();
};

// ---------------------------------------------------------------
// Initial JS
// ---------------------------------------------------------------
// clear all variables first
clearGrafanaVariables();

// hide non-initial elements
htmlNode.getElementById("error").style.display = "none";
htmlNode.getElementById("spinner").style.display = "none";
htmlNode.getElementById("action_btn_grp").style.display = "none";
/* Add new variables in this block */
htmlNode.getElementById("SS_assigned_by_grp").style.display = "none";
htmlNode.getElementById("SS_social_network_grp").style.display = "none";
htmlNode.getElementById("SS_description_message_grp").style.display = "none";
htmlNode.getElementById("SS_digital_resource_grp").style.display = "none";
htmlNode.getElementById("SS_case_status_grp").style.display = "none";
htmlNode.getElementById("SS_cp_digital_status_grp").style.display = "none";
htmlNode.getElementById("SS_lob_grp").style.display = "none";
htmlNode.getElementById("SS_member_id_grp").style.display = "none";
htmlNode.getElementById("SS_member_full_name_grp").style.display = "none";
htmlNode.getElementById("SS_consumer_feedback_grp").style.display = "none";
/* Add new variables in this block */
