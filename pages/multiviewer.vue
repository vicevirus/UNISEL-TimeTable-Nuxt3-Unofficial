<template>
<Head>
    <Title>UNISEL Timetable (Unofficial) / Subjects Multiviewer</Title>
    <Meta name="description" content="Unisel Timetable Multiviewer. View multiple subjects in one page." />
</Head>
<div id="app">
    <v-app>

        <appBar />
        <div class="boxSpace" style="height: 3vh;"></div>

        <wrapper>
            <subjectSelection pageTitle="Subjects MultiViewer" pageDesc="View multiple subjects in one place." pageNote="Type in or select your subject name and keep on adding the subjects
                                        you wish
                                        to view." @selected-subject="onSelectedSubject" @selected-campus="onSelectedCampus" @time-data="fetchTimeData" @subjects="fetchSubjectsData" @timetable-data="fetchTimetableData">
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
                            <th :colspan="selectedCampus === 'SA' ? 15 : 12" class="xAxis text-left">&nbsp; {{ subject.subject
                                }}</th>
                            <tr>
                                <th class="xAxis">Day</th>
                                <th v-for="time in currentCampusTimeSlots" :key="time" class="xAxis">{{ time }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="day in daysOfWeek" :key="day">

                                <td class="day">{{ day.slice(0, 3) }}</td>
                                <td v-for="(time, index) in timeData[subject.index][day.toLowerCase()]" :key="index">
                                    {{ time || '-' }}
                                </td>
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
            daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        };
    },

    methods: {
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
            if (this.selectedCampus === 'SA') {
                return this.timeSlots;
            } else {
                return this.timeSlots.slice(0, 11);
            }
        }
    },

};
</script>

<style>
@import '~/assets/styles.css';
</style>
