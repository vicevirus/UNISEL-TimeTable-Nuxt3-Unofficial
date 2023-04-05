modify this code to wait for updatesubjects before allowing to select 
<template>
    <v-card variant="tonal" style="text-align: center; ">
        <v-alert>
            <h2><b>{{ pageTitle }}</b></h2> {{ pageDesc }}
        </v-alert>

        <v-divider thickness="1px" color="purple"></v-divider>

        <v-card-text>
            <v-alert color="purple darken-2" v-if="!selectedCampus">Please select a campus.</v-alert>

            <v-container :fluid="true">
                <div class="radio-group">

                    <div class="boxSpace" style="height: 3vh"></div>
                    <div>
                        <label class="radio-label">
                            <input type="radio" id="campus-SA" value="SA" v-model="selectedCampus" class="radio-input" >
                            <span class="radio-custom"></span>
                            Shah Alam
                        </label>
                        <label class="radio-label">
                            <input type="radio" id="campus-BJ" value="BJ" v-model="selectedCampus" class="radio-input">
                            <span class="radio-custom"></span>
                            Bestari Jaya
                        </label>
                        <label class="radio-label">
                            <input type="radio" id="campus-F" value="F" v-model="selectedCampus" class="radio-input">
                            <span class="radio-custom"></span>
                            Foundation
                        </label>
                    </div>
                </div>
                <div class="boxSpace" style="height: 1vh"></div>
            </v-container>
            <br>
            <p v-if="selectedCampus" style="font-size: 15px">Semester: <b>{{ semesterCode }}</b></p>
        </v-card-text>

    </v-card>

    <div class="boxSpace" style="height: 2vh"></div>
    <div v-if="selectedCampus">

        <v-card variant="tonal" style="text-align: center; ">
            <v-card-text>
                <v-container :fluid="true">

                    <v-alert><b>Note: </b>
                        <p> {{ pageNote }}</p>
                        <b>Update Note: </b>
                        <p> {{ updateNote }}</p>
                    </v-alert>
                </v-container>
            </v-card-text>
        </v-card>
        <br>
        <div v-if="loading">
        <vue-select :style="{ 'max-width': '100%', 'color': 'black', 'background-color': 'white' }" :options="paginated"
            v-model="selectedSubject" :reduce="subject => ({ label: subject.label, index: subject.index })"
            :filterable="false" @search="onSearch">

            <template v-slot:list-footer>
                <li class="pagination">
                    <v-btn rounded="0" :disabled="!hasPrevPage" @click="offset -= limit">Prev</v-btn>
                    <v-btn rounded="0" :disabled="!hasNextPage" @click="offset += limit">Next</v-btn>
                </li>

            </template>

        </vue-select>
    </div>
        <slot></slot>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: {
        pageTitle: String,
        pageDesc: String,
        pageNote: String,
        updateNote: String
    },
    emits: ["selected-subject", "selected-campus", "time-data", "subjects", "timetable-data"],
    data() {
        return {

            limit: 6,
            offset: 0,
            search: '',
            campuses: ["SA", "BJ", "F"],
            selectedCampus: "",
            semesterCode: "",
            searchInput: null,
            selected: '',
            subjects: [{ label: "Please type in a subject name or code.." }],
            selectedSubject: "Select Subject",
            timetableData: {},
            timeData: {},
            loading: false,
        };
    },
    methods: {
        onSubjectSelected(selectedSubject) {
            this.$emit('selected-subject', selectedSubject);

            this.$emit('subjects', this.subjects);
            this.$emit('timetable-data', this.timetableData);
        },
        onSelectedCampus(selectedCampus) {
            this.$emit('selected-campus', selectedCampus);
            this.$emit('time-data', this.timeData);
        },
        onSearch(query) {
            this.search = query
            this.offset = 0

        },
        async updateSubjects() {

            try {
                if (!this.selectedCampus) {
                    return;
                }
                this.loading = false;
                const response = await axios.get("https://uniseltimetableapi.zapto.org/latest_semester_codes");
                const latestSemesterCode = response.data[this.selectedCampus][0]
                this.semesterCode = latestSemesterCode;

                // Update the API URL with the latest semester code
                const apiUrl = `https://uniseltimetableapi.zapto.org/timetable_data/${this.selectedCampus}/${latestSemesterCode}`;
                const response2 = await axios.get(apiUrl);

                this.timetableData = response2.data;

                const campusData = this.timetableData;
                this.subjects = this.timetableData.subjects.map(
                    (subject, index) => ({ label: subject.subject, index: index })
                );

                this.timeData = campusData.subjectsTime
                this.loading = true;

            } catch (error) {
                console.error("Error fetching timetable data:", error);
            }
        },

    },
    computed: {
        filtered() {
            const filteredSubjects = this.subjects.filter((subject) =>
                subject.label.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
            );

            return filteredSubjects;
        },
        paginated() {
            const test = this.filtered.slice(this.offset, this.limit + this.offset)

            return test
        },
        hasNextPage() {
            const nextOffset = this.offset + this.limit
            const test = Boolean(
                this.filtered.slice(nextOffset, this.limit + nextOffset).length)

            return test

        },
        hasPrevPage() {

            const prevOffset = this.offset - this.limit

            return Boolean(
                this.filtered.slice(prevOffset, this.limit + prevOffset).length
            )
        },

    },
    watch: {
        selectedCampus(selectedCampus) {
            this.selectedCampus = selectedCampus;
            this.updateSubjects().then(() => {
                this.timeData = this.timetableData.subjectsTime;
                this.$emit('selected-campus', selectedCampus);
                this.$emit('time-data', this.timeData);
                this.loading = true;

            });
            this.selectedSubject = "Select or type in a subject..";

        },
        selectedSubject(newValue) {
            this.onSubjectSelected(newValue)
        },

    },
    created() {
        this.updateSubjects().then(() => {
            // Set the default selected subject
            this.selectedSubject = this.subjects[0];
        });
    },
}
</script>
