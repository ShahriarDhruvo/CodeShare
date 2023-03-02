const TIMEOUT = 1000;
const loader = htmlNode.getElementById("spinner");
const submitBtn = htmlNode.getElementById("submit_btn");
const nameOfTheEffort = htmlNode.getElementById("name_of_the_effort");
const lineOfBusinesses = htmlNode.getElementById("line_of_businesses");
const populationType = htmlNode.getElementById("population_type");
const frequency = htmlNode.getElementById("frequency");
const volume = htmlNode.getElementById("volume");
const startDate = htmlNode.getElementById("start_date");
const endDate = htmlNode.getElementById("end_date");
const portals = htmlNode.getElementById("portals");
const titleMonths = htmlNode.getElementById("title_months");

const updateGrafanaVariable = (variableName, value) => {
    htmlGraphics.locationService.partial(
        {
            [`var-${variableName}`]: value,
        },
        true
    );
};

submitBtn.onclick = () => {
    if (
        nameOfTheEffort.querySelector("input").value === "" ||
        lineOfBusinesses.querySelector("input").value === "" ||
        populationType.querySelector("input").value === "" ||
        frequency.querySelector("input").value === "" ||
        volume.querySelector("input").value === "" ||
        startDate.querySelector("input").value === "" ||
        endDate.querySelector("input").value === "" ||
        portals.querySelector("input").value === "" ||
        titleMonths.querySelector("input").value === ""
    ) {
        htmlNode.getElementById("error").style.display = "block";
    } else {
        loader.style.display = "inline-block";
        htmlNode.getElementById("error").style.display = "none";

        updateGrafanaVariable(
            "CD_name_of_the_effort",
            nameOfTheEffort.querySelector("input").value
        );
        updateGrafanaVariable(
            "CD_line_of_businesses",
            lineOfBusinesses.querySelector("input").value
        );
        updateGrafanaVariable(
            "CD_population_type",
            populationType.querySelector("input").value
        );
        updateGrafanaVariable(
            "CD_frequency",
            frequency.querySelector("input").value
        );
        updateGrafanaVariable("CD_volume", volume.querySelector("input").value);
        updateGrafanaVariable(
            "CD_start_date",
            startDate.querySelector("input").value
        );
        updateGrafanaVariable(
            "CD_end_date",
            endDate.querySelector("input").value
        );
        updateGrafanaVariable(
            "CD_portals",
            portals.querySelector("input").value
        );
        updateGrafanaVariable(
            "CD_title_months",
            titleMonths.querySelector("input").value
        );

        setTimeout(() => {
            nameOfTheEffort.querySelector("input").value = "";
            lineOfBusinesses.querySelector("input").value = "";
            populationType.querySelector("input").value = "";
            frequency.querySelector("input").value = "";
            volume.querySelector("input").value = "";
            startDate.querySelector("input").value = "";
            endDate.querySelector("input").value = "";
            portals.querySelector("input").value = "";
            titleMonths.querySelector("input").value = "";

            loader.style.display = "none";
        }, TIMEOUT);
    }
};

// ---------------------------------------------------------------
// Initial JS
// ---------------------------------------------------------------
htmlNode.getElementById("error").style.display = "none";
htmlNode.getElementById("spinner").style.display = "none";
