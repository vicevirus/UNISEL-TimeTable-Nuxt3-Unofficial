<template>
<Head>
    <Title>UNISEL Timetable - Easily Find Schedules for All Subjects</Title>
    <Meta name="description" content="Discover UNISEL timetables with ease. Browse schedules for all subjects in one convenient location. Data is hosted on Github and updated every 5 minutes." />
    <Meta name="robots" content="index, follow" />
    <Meta name="google-site-verification" content="DepUX8AsAZTNU59dLXVZOVfzqZwhTz4Cv9KiZXL6ndA" />
    <Meta name="keywords" content="UNISEL, timetable, schedule, university, subject, campus, Malaysia" />
</Head>
<div id="app">
    <main>
        <v-app>

            <appBar />

            <div class="boxSpace" style="height: 3vh;"></div>

            <wrapper>
                <subjectSelection pageTitle="Timetable" pageDesc="View subjects timetable." updateNote="Data are now hosted on Github for reducing cost." updateNoteLine2="Data updates every 5mins." pageNote="Scroll the table horizontally/vertically if it's too big." @selected-subject="onSelectedSubject" @selected-campus="onSelectedCampus" @time-data="fetchTimeData" />

            </wrapper>

            <v-container :fluid="true" class="timetable-container">
                <div v-if="selectedSubject.index >= 0">
                    <v-responsive v-if="selectedSubject !== ''">
                        <v-table class="timetable">
                            <thead>
                                <th :colspan="currentCampusTimeSlots.length + 1" class="xAxis text-left">&nbsp; {{
                                        selectedSubject.label }}</th>
                                <tr>
                                    <th class="xAxis">Day</th>
                                    <th v-for="time in currentCampusTimeSlots" :key="time" class="xAxis">{{ time }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="day in filteredDaysOfWeek" :key="day">
                                    <td class="day">{{ day.slice(0, 3) }}</td>
                                    <td v-for="(time, index) in timeData[this.selectedSubject.index][day.toLowerCase()]" :key="index">
                                        {{ time || '-' }}
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-responsive>
                </div>
            </v-container>

        </v-app>
    </main>
</div>
</template>

<script>
export default {

    data() {
        return {

            limit: 6,
            offset: 0,
            search: '',
            selectedCampus: "",
            subjects: [{ label: "Please type in a subject name or code.." }],
            selectedSubject: "Select Subject",
            timetableData: {},
            timeData: {},
            timeSlots: [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
            ],
            daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            filteredDaysOfWeek: [],
        };
    },

    methods: {
        updateFilteredDaysOfWeek() {
            if (this.selectedCampus === 'SA') {
                this.filteredDaysOfWeek = this.daysOfWeek
            } else {
                this.filteredDaysOfWeek = this.daysOfWeek.slice(0, 5);
            }
        },
        getCurrentCampusTimeSlots() {
            if (this.selectedCampus === 'SA') {

                return this.timeSlots;
            } else if (this.selectedCampus === 'BJ') {

                return this.timeSlots.slice(0, 12);
            } else {

                return this.timeSlots.slice(0, 11);
            }

        },
        onSelectedSubject(subject) {
            this.selectedSubject = subject

        },
        onSelectedCampus(campus) {

            this.selectedCampus = campus

        },

        fetchTimeData(timeData) {
            this.timeData = timeData

        },
        onSearch(query) {
            this.search = query
            this.offset = 0

        },

    },
    computed: {
        currentCampusTimeSlots() {
            return this.getCurrentCampusTimeSlots();

        },

    },
    watch: {
        selectedCampus(newVal) {

            this.updateFilteredDaysOfWeek();
        },
    },

    mounted() {
        this.updateFilteredDaysOfWeek();
    },

}
</script>

<style>
@import '~/assets/styles.css';
</style>
