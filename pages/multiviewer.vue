<template>
<Head>
    <Title>UNISEL Timetable MultiViewer (Unofficial) - View and Manage Multiple Subjects</Title>
        <Meta name="description" content="The Unofficial UNISEL Timetable MultiViewer allows you to view and manage multiple subjects in one convenient page. Easily add and organize your subjects by campus." />
        <Meta name="keywords" content="UNISEL, timetable, multi-viewer, unofficial, subjects, campus, schedule, university" />
</Head>
<div id="app">
    <v-app>

        <appBar />
        <div class="boxSpace" style="height: 3vh;"></div>

        <wrapper>
            <subjectSelection pageTitle="Subjects MultiViewer" pageDesc="View multiple subjects in one place."  pageNote="Data are now hosted on Github for reducing cost."  @selected-subject="onSelectedSubject" @selected-campus="onSelectedCampus" @time-data="fetchTimeData" @subjects="fetchSubjectsData" @timetable-data="fetchTimetableData">
                <v-container class="text-center" :fluid="true">
                    <v-btn color="orange" @click="addSubject">Add
                        subject</v-btn>
                </v-container>
            </subjectSelection>

        </wrapper>
        <v-container :fluid="true" v-for="subject in addedSubjectsByCampus[selectedCampus]" class="timetable-container">

            <div v-if="subject.index >= 0">

                <v-responsive v-if="selectedSubject !== ''">
                    <v-table class="timetable">
                        <thead>
                            <th :colspan="currentCampusTimeSlots.length + 1" class="xAxis text-left">&nbsp; {{
                                    subject.subject
                                }}</th>
                            <tr>
                                <th class="xAxis">Day</th>
                                <th v-for="time in currentCampusTimeSlots" :key="time" class="xAxis">{{ time }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="day in filteredDaysOfWeek" :key="day">

                                <td class="day">{{ day.slice(0, 3) }}</td>
                                <td v-for="(time, index) in currentCampusTimeSlots" :key="index">
                                    {{ index < timeData[subject.index][day.toLowerCase()].length ?
                                            timeData[subject.index][day.toLowerCase()][index] || '-' : '-' }} </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-responsive>
            </div>
        </v-container>

    </v-app>
</div>
</template>

<script>
export default {
    data() {
        return {

            limit: 6,
            offset: 0,
            search: '',
            addedSubjectsByCampus: {
                'SA': [],
                'BJ': [],
                'F': []
            },

            timetableData: [],
            selectedSubject: null,

            error: '',
            subjects: [],
            selectedCampus: null,

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
            timeData: {},
            daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            filteredDaysOfWeek: []

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

        onSearch(query) {
            this.search = query
            this.offset = 0

        },
        onSelectedSubject(subject) {
            this.selectedSubject = subject.label

        },
        onSelectedCampus(campus) {
            this.selectedCampus = campus

        },
        fetchTimeData(timeData) {
            this.timeData = timeData

        },
        fetchSubjectsData(subjectsData) {
            this.subjects = subjectsData

        },
        fetchTimetableData(timeTableData) {
            this.timetableData = timeTableData

        },

        addSubject() {
            if (this.selectedSubject === '') {
                this.error = 'Please select a subject';
                return;
            }

            const label = this.selectedSubject;

            const matchedSubject = this.subjects.find(subject => subject.label === label);

            if (!matchedSubject) {
                this.error = `Subject "${label}" not found.`;
                return;
            }

            const selectedSubject = {
                ...this.timetableData.subjects[matchedSubject.index],
                index: matchedSubject.index
            };

            this.addedSubjectsByCampus[this.selectedCampus].push(selectedSubject);

            this.error = '';

        },

    },
    computed: {
        currentCampusTimeSlots() {
            return this.getCurrentCampusTimeSlots();
        }
    },
    watch: {
        selectedCampus(newVal) {

            this.updateFilteredDaysOfWeek();
        },
    },
    mounted() {
        this.updateFilteredDaysOfWeek();
    },

};
</script>

<style>
@import '~/assets/styles.css';
</style>
