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
               
                
                <v-card variant="tonal" style="text-align: center; ">
                    
                    <v-alert ><h2><b>Subjects MultiViewer</b></h2>View multiple subjects in one place.</v-alert>
    
            

                    <v-divider thickness="1px" color="purple"></v-divider>
                   
                    <v-card-text>
                        <v-alert color="purple darken-2" v-if="!selectedCampus">Please select a campus.</v-alert>

                        <v-container :fluid="true">
                            <div class="radio-group">

                                <div class="boxSpace" style="height: 3vh"></div>
                                <div>
                                    <label class="radio-label">
                                        <input type="radio" id="campus-SA" value="SA" v-model="selectedCampus"
                                            class="radio-input">
                                        <span class="radio-custom"></span>
                                        Shah Alam
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" id="campus-BJ" value="BJ" v-model="selectedCampus"
                                            class="radio-input">
                                        <span class="radio-custom"></span>
                                        Bestari Jaya
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" id="campus-F" value="F" v-model="selectedCampus"
                                            class="radio-input">
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

                                <v-btn color="orange" @click="reset" rounded="lg" class="clear-button" style="width: 100%">
                                    <i class="material-icons">
                                        clear
                                    </i>
                                    Clear
                                </v-btn>

                                <div class="boxSpace" style="height: 1vh;"></div>
                                <v-autocomplete auto-select-first ref="input" label="Subject" v-model="selectedSubjectIndex"
                                    :items="subjects" item-text="subject" variant="solo" item-value="index"
                                    placeholder="Select Subject" 
                                    :style="{ 'max-width': '100%', 'height': '10vh' }">
                                </v-autocomplete>
                                <div class="boxSpace" style="height: 1vh"></div>
                                <v-alert><b>Note: </b>Type in or select your subject name and <p>keep on adding the subjects
                                        you wish
                                        to view.</p></v-alert>
                                <div class="boxSpace" style="height: 1vh;"></div>
                                <v-btn @click="addSubject">Add subject</v-btn>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </div>

            </wrapper>

            <v-container :fluid="true" class="timetable-container">
                <v-responsive v-if="selectedSubject !== '' && selectedCampus == 'BJ' || selectedCampus == 'F'">
                    <v-table class="timetable" v-for="subject in addedSubjects">

                        <thead>
                            <tr>
                                <th colspan="12" class="xAxis">{{ subject.subject }}</th>
                            </tr>
                            <tr>

                                <th class="xAxis">Day</th>
                                <th class="xAxis">08:00</th>
                                <th class="xAxis">09:00</th>
                                <th class="xAxis">10:00</th>
                                <th class="xAxis">11:00</th>
                                <th class="xAxis">12:00</th>
                                <th class="xAxis">13:00</th>
                                <th class="xAxis">14:00</th>
                                <th class="xAxis">15:00</th>
                                <th class="xAxis">16:00</th>
                                <th class="xAxis">17:00</th>
                                <th class="xAxis">18:00</th>


                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="day in days" :key="day">
                                <td class="day">{{ day.slice(0, 3) }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][0] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][1] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][2] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][3] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][4] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][5] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][6] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][7] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][8] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][9] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][10] }}</td>


                            </tr>
                        </tbody>
                    </v-table>

                </v-responsive>

                <v-responsive v-if="selectedSubject !== '' && selectedCampus == 'SA'">
                    <v-table class="timetable" v-for="subject in addedSubjects">

                        <thead>
                            <tr>
                                <th colspan="15" class="xAxis">{{ subject.subject }}</th>
                            </tr>
                            <tr>

                                <th class="xAxis">Day</th>
                                <th class="xAxis">08:00</th>
                                <th class="xAxis">09:00</th>
                                <th class="xAxis">10:00</th>
                                <th class="xAxis">11:00</th>
                                <th class="xAxis">12:00</th>
                                <th class="xAxis">13:00</th>
                                <th class="xAxis">14:00</th>
                                <th class="xAxis">15:00</th>
                                <th class="xAxis">16:00</th>
                                <th class="xAxis">17:00</th>
                                <th class="xAxis">18:00</th>
                                <th class="xAxis">19:00</th>
                                <th class="xAxis">20:00</th>
                                <th class="xAxis">21:00</th>


                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="day in days" :key="day">
                                <td class="day">{{ day.slice(0, 3) }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][0] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][1] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][2] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][3] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][4] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][5] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][6] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][7] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][8] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][9] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][10] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][11] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][12] }}</td>
                                <td>{{ timeData[subject.index][day.toLowerCase()][13] }}</td>


                            </tr>
                        </tbody>
                    </v-table>

                </v-responsive>
            </v-container>


        </v-app>
    </div>
</template>
  
<script>
import axios from "axios";
export default {
    data() {
        return {
            timetableData: [],
            selectedSubjectIndex: '',
            addedSubjects: [],
            error: '',
            subjects: [],
            selectedCampus: null,
            semesterCode: "",
            timeData: {},

            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        };
    },
    async created() {
        await this.fetchSubjects();
    },

    methods: {
        async updateSubjects() {
            try {
                if (!this.selectedCampus) {
                    return;
                }
                const response = await axios.get("https://uniseltimetableapi.duckdns.org:8000/latest_semester_codes");
                const latestSemesterCode = response.data[this.selectedCampus][0]
                this.semesterCode = latestSemesterCode;


                // Update the API URL with the latest semester code
                const apiUrl = `https://uniseltimetableapi.duckdns.org:8000/timetable_data/${this.selectedCampus}/${latestSemesterCode}`;
                const response2 = await axios.get(apiUrl);

                this.timetableData = response2.data;

                const campusData = this.timetableData;
                this.subjects = this.timetableData.subjects.map(
                    (subject, index) => ({ title: subject.subject, index: index })
                );
                this.timeData = campusData.subjectsTime

           



            } catch (error) {
                console.error("Error fetching timetable data:", error);
            }
        },
        addSubject() {
            if (this.selectedSubjectIndex === '') {
                this.error = 'Please select a subject';
                return;
            }

            const selectedSubject = {
                ...this.timetableData.subjects[this.selectedSubjectIndex],
                time: this.timetableData.subjectsTime[this.selectedSubjectIndex],
                index: this.selectedSubjectIndex
            };


            this.addedSubjects.push(selectedSubject);
            this.error = '';
            this.selectedSubjectIndex = '';

            console.log(this.addedSubjects)
        },
        reset() {
            if (this.selectedCampus === "F") {
                this.selectedSubjectIndex = ""; // clear the selectedSubject property
                this.$refs.input.search = ""; // clear the input search property
            } else {
                this.selectedSubjectIndex = ""; // clear the selectedSubject property
                this.$refs.input.search = 'Default Value';
            }
        },
    },
    watch: {
        selectedCampus() {
            this.updateSubjects();
        },

    },
    created() {
        this.updateSubjects();
    },
};
</script>
  
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

a {

    text-decoration: none;

}

.radio-group {
    margin-top: -2rem;
    margin-bottom: -2rem;
}


.radio-label {
    display: inline-block;
    position: relative;
    padding-left: 30px;
    margin-right: 15px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
}

.radio-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.radio-custom {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

}

.radio-input:checked~.radio-custom {
    background-color: #1E88E5;
    box-shadow: 0 2px 4px rgba(30, 136, 229, 0.4);
}

.radio-custom:after {
    content: "";
    position: absolute;
    display: none;
}

.radio-input:checked~.radio-custom:after {
    display: block;
}

.radio-custom:after {
    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
}

.title {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px;
    font-weight: bold;
}

.mr-3 {
    font-size: 16px;
    color: white;
    margin-left: 10px;
}


.boxSpace {
    height: 5vh;
}

#subject-select {

    min-width: 500px;
}


@media (max-width: 600px) {

    .timetable th,
    .timetable td {
        font-size: 5px;
        line-height: 1;
    }
}

.timetable {
    width: 190vh;
    table-layout: fixed;
    border-collapse: collapse;
    margin: auto;
    overflow-x: auto;
    margin-bottom: 3vh;

}

.timetable th,
.timetable td {
    border: 1px solid black;
    text-align: center;
    font-size: 13px;
    line-height: 1.5;
}

.timetable th,
.day {

    font-weight: bold;
    background-color: #E0E0E0;
    color: black !important;
}

.timetable tr {
    height: 40px;
}

.xAxis {
    min-width: 80px;
    font-weight: bold !important;
    background-color: #E0E0E0;
    color: black !important;
}
</style>