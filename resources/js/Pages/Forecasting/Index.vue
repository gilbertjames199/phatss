<template>
    <Head>
        <title>Forecasting</title>
    </Head>

    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Forecasting</h3>
        </div>
        <div class="bgc-white p-20 bd">
            <!-- <img path="trend_graph.png" /> -->
            <!-- Centered Image -->
            <div class="text-center mb-3">
                <img src="./trend_graph.png" alt="Forecasting Image" class="img-fluid" />
            </div>

            <form>
                <!-- Historical Complaints Analysis -->
                <div class="form-group">
                    <label for="complaints-analysis">Analyze Historical Complaints</label>
                    <textarea id="complaints-analysis" class="form-control" placeholder="Enter data or select criteria (e.g., frequency, types, locations)"></textarea>
                </div>

                <!-- Correlate Events -->
                <div class="form-group">
                    <label for="events-correlation">Correlate Events</label>
                    <textarea id="events-correlation" class="form-control" placeholder="Enter events to correlate (e.g., market days, weather conditions, local holidays)"></textarea>
                </div>

                <!-- Service Demand Estimation -->
                <div class="form-group">
                    <label for="service-demand">Service Demand Estimation</label>
                    <textarea id="service-demand" class="form-control" placeholder="Estimate future requirements for services (e.g., toilet facilities usage)"></textarea>
                </div>

                <!-- Population and Sanitation Demand -->
                <div class="form-group">
                    <label for="population-demand">Population and Sanitation Demand</label>
                    <textarea id="population-demand" class="form-control" placeholder="Describe how population affects sanitation facility demand"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

            <table class="table table-sm table-borderless table-striped table-hover mt-3">
                <thead>
                    <tr>
                        <th>Analysis</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Historical Complaints</td>
                        <td id="display-complaints"></td>
                    </tr>
                    <tr>
                        <td>Event Correlation</td>
                        <td id="display-events"></td>
                    </tr>
                    <tr>
                        <td>Service Demand</td>
                        <td id="display-demand"></td>
                    </tr>
                    <tr>
                        <td>Population and Sanitation Demand</td>
                        <td id="display-population"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        test: Object
    },
    data() {
        return {
            complaints: "",
            events: "",
            demand: "",
            population: ""
        };
    },
    methods: {
        handleSubmit(event) {
            event.preventDefault();
            document.getElementById('display-complaints').innerText = this.complaints;
            document.getElementById('display-events').innerText = this.events;
            document.getElementById('display-demand').innerText = this.demand;
            document.getElementById('display-population').innerText = this.population;
        }
    }
};
</script>
