<template>
  <div class="repo-datetime-vue">
    <div class="repo-datetime-vue-wrapper">
      <input type="hidden" :id="id" :name="name" :value="formatedDate">

      <!-- Year -->
      <div :class="[selectWrapperClassName]" v-if="isRequested('y')">
        <select
          v-model="selectedYear"
          @change="updateDays()"
          :class="[selectClassName, selectYearClassName]"
        >
          <option
            v-for="(year, index) in years"
            :key="index"
            :value="year.year"
            v-html="getYearForDisplay(year.year)"
          ></option>
        </select>
      </div>

      <!-- Month -->
      <div :class="[selectWrapperClassName]" v-if="isRequested('m')">
        <select
          v-model="selectedMonth"
          @change="updateDays()"
          :class="[selectClassName, selectMonthClassName]"
        >
          <option
            v-for="(month, index) in months"
            :value="index"
            :key="month.month"
            v-html="getMonthForDisplay(month.month)"
          ></option>
        </select>
      </div>

      <!-- Day -->
      <div :class="[selectWrapperClassName]" v-if="isRequested('d')">
        <select v-model="selectedDay" :class="[selectClassName, selectDayClassName]">
          <option
            v-for="(day, index) in days"
            :key="index"
            :value="day.day"
            v-html="getDayForDisplay(day.day)"
          ></option>
        </select>
      </div>

      <!-- Hour -->
      <div :class="[selectWrapperClassName]" v-if="isRequested('h')">
        <select v-model="selectedHour" :class="[selectClassName, selectDayClassName]">
          <option
            v-for="(hour, index) in hours"
            :key="index"
            :value="hour.hour"
            v-html="getHourForDisplay(hour.hour, index)"
          ></option>
        </select>
      </div>

      <!-- Minute -->
      <div :class="[selectWrapperClassName]" v-if="isRequested('i')">
        <select v-model="selectedMinute" :class="[selectClassName, selectDayClassName]">
          <option
            v-for="(minute, index) in minutes"
            :key="index"
            :value="minute.minute"
            v-html="getMinuteForDisplay(minute.minute)"
          ></option>
        </select>
      </div>

      <!-- Second -->
      <div :class="[selectWrapperClassName]" v-if="isRequested('s')">
        <select v-model="selectedSecond" :class="[selectClassName, selectDayClassName]">
          <option
            v-for="(second, index) in seconds"
            :key="index"
            :value="second.second"
            v-html="getSecondForDisplay(second.second)"
          ></option>
        </select>
      </div>

      <!-- PM or AM -->
      <div :class="[selectWrapperClassName]" v-if="hourClock === '12-hour'">
        <select v-model="selectedShift" :class="[selectClassName, selectDayClassName]">
          <option value="am">am</option>
          <option value="pm">pm</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
const defaultMonths = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
};

export default {
  props: {
    id: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },

    default: {
      type: String,
      required: false
    },
    min: {
      type: String,
      required: false
    },
    max: {
      type: String,
      required: false
    },
    monthsNames: {
      type: String,
      required: false
    },
    yearSuffix: {
      type: String,
      required: false,
      default: ''
    },
    monthSuffix: {
      type: String,
      required: false,
      default: ''
    },
    daySuffix: {
      type: String,
      required: false,
      default: ''
    },
    hourClock: {
      type: String,
      required: false,
      default: '24-hour'
    },
    outputFormat: {
      type: String,
      required: false,
      default: 'y-m-d h:i:s'
    },
    displayFormat: {
      type: String,
      required: false,
      default: 'ymdhis'
    },
    selectClassName: {
      type: String,
      required: false,
      default: 'repo-datetime-vue-select'
    },
    selectDayClassName: {
      type: String,
      required: false,
      default: 'day'
    },
    selectMonthClassName: {
      type: String,
      required: false,
      default: 'month'
    },
    selectYearClassName: {
      type: String,
      required: false,
      default: 'year'
    },
    selectWrapperClassName: {
      type: String,
      required: false,
      default: 'repo-datetime-vue-select-wrapper'
    },
    containerClassName: {
      type: String,
      required: false,
      default: 'repo-datetime-vue-container'
    }
  },
  data() {
    return {
      days: [],
      selectedShift: '',
      selectedSecond: '',
      selectedMinute: '',
      selectedHour: '',
      selectedDay: '',
      selectedMonth: '',
      selectedYear: ''
    };
  },
  computed: {
    // Returns if there are default date settings.
    initialDate() {
      return !!(this.default || this.min);
    },
    // The date property, converted to a date.
    specifiedDate() {
      return new Date(this.default);
    },
    // The minimum date the will allow user to select.
    minDate() {
      if (this.min) {
        return new Date(this.min);
      }

      return;
    },
    // The maximum date the will allow user to select.
    maxDate() {
      if (this.max) {
        return new Date(this.max);
      }

      return;
    },
    formatedDate() {
      const day =
        this.selectedDay >= 10 ? this.selectedDay : `0${this.selectedDay}`;

      const month =
        this.selectedMonth + 1 >= 10
          ? this.selectedMonth + 1
          : `0${this.selectedMonth + 1}`;

      let hour;

      if (this.hourClock === '12-hour') {
        hour =
          this.getHourIn24Base(this.selectedHour) >= 10
            ? this.getHourIn24Base(this.selectedHour)
            : `0${this.getHourIn24Base(this.selectedHour)}`;
      } else {
        hour =
          this.selectedHour >= 10 ? this.selectedHour : `0${this.selectedHour}`;
      }

      const minute =
        this.selectedMinute >= 10
          ? this.selectedMinute
          : `0${this.selectedMinute}`;

      const second =
        this.selectedSecond >= 10
          ? this.selectedSecond
          : `0${this.selectedSecond}`;

      let output = this.outputFormat;

      output = output.replace(/y/gi, this.selectedYear);
      output = output.replace(/m/gi, month);
      output = output.replace(/d/gi, day);
      output = output.replace(/h/gi, hour);
      output = output.replace(/i/gi, minute);
      output = output.replace(/s/gi, second);

      return output;
    },
    // Returns a formatted date e.g. 01.02.2018.
    calculatedDate() {
      const day =
        this.selectedDay >= 10 ? this.selectedDay : `0${this.selectedDay}`;

      const month =
        this.selectedMonth + 1 >= 10
          ? this.selectedMonth + 1
          : `0${this.selectedMonth + 1}`;

      let hour;

      if (this.hourClock === '12-hour') {
        hour =
          this.getHourIn24Base(this.selectedHour) >= 10
            ? this.getHourIn24Base(this.selectedHour)
            : `0${this.getHourIn24Base(this.selectedHour)}`;
      } else {
        hour =
          this.selectedHour >= 10 ? this.selectedHour : `0${this.selectedHour}`;
      }

      const minute =
        this.selectedMinute >= 10
          ? this.selectedMinute
          : `0${this.selectedMinute}`;

      const second =
        this.selectedSecond >= 10
          ? this.selectedSecond
          : `0${this.selectedSecond}`;

      return `${this.selectedYear}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    // The alternative names of months
    dividedNamesOfMonths() {
      if (this.monthsNames) {
        return this.monthsNames.replace(/\s/g, '').split(',');
      }

      return;
    },
    // Computes a list of seconds.
    seconds() {
      let seconds = [];

      for (let i = 0; i < 60; i++) {
        seconds.push(i);
      }

      return seconds.map((second, index) => {
        return { second, selected: index === this.selectedSecond };
      });
    },

    // Computes a list of minutes.
    minutes() {
      let minutes = [];

      for (let i = 0; i < 60; i++) {
        minutes.push(i);
      }

      return minutes.map((minute, index) => {
        return { minute, selected: index === this.selectedMinute };
      });
    },

    // Computes a list of hour.
    hours() {
      let hours = [];

      if (this.hourClock == '12-hour') {
        for (let i = 0; i < 12; i++) {
          hours.push(i);
        }
      } else if (this.hourClock == '24-hour') {
        for (let i = 0; i < 24; i++) {
          hours.push(i);
        }
      }

      return hours.map((hour, index) => {
        return { hour, selected: index === this.selectedHour };
      });
    },

    // Computes a list of month.
    months() {
      let months = [];

      for (let i = 0; i < 12; i++) {
        if (this.dividedNamesOfMonths) {
          months.push(this.dividedNamesOfMonths[i]);
        } else {
          months.push(defaultMonths[i]);
        }
      }

      return months.map((month, index) => {
        return { month, selected: index === this.selectedMonth };
      });
    },
    // Computes a list of years.
    years() {
      // Set the first year of the array.
      let firstYear;

      if (this.min) {
        firstYear = this.minDate.getFullYear();
      } else if (this.default) {
        firstYear = this.specifiedDate.getFullYear();
      } else {
        firstYear = new Date().getFullYear();
      }

      // Create a range of years to loop through which is either the maximum
      // date minus the first year, or simply 100.
      let through = this.max ? this.maxDate.getFullYear() + 1 - firstYear : 101;

      let years = [];

      for (let i = firstYear, len = firstYear + through; i < len; i++) {
        years.push(i);
      }

      const is_year_on_list = years.find(
        year => year == this.specifiedDate.getFullYear()
      );

      if (!is_year_on_list) {
        if (this.specifiedDate.getFullYear() < this.min) {
          years.unshift(this.specifiedDate.getFullYear());
        } else {
          years.push(this.specifiedDate.getFullYear());
        }
      }

      return years.map(year => {
        return { year, selected: year === this.selectedYear };
      });
    }
  },
  methods: {
    getHourIn24Base() {
      if (this.selectedShift === 'am') {
        return this.selectedHour;
      } else if (this.selectedShift === 'pm') {
        return parseInt(this.selectedHour, 10) + 12;
      }

      return this.selectedHour;
    },
    getHourIn12Base(hour) {
      let shift;
      let vhouer;

      if (hour > 11) {
        vhouer = parseInt(hour, 10) - 12;
        shift = 'pm';
      } else if (hour < 12) {
        vhouer = hour;
        shift = 'am';
      }

      return { hour: vhouer, shift: shift };
    },

    getYearForDisplay(year) {
      return year + this.yearSuffix;
    },

    getMonthForDisplay(month) {
      return month + this.monthSuffix;
    },

    getDayForDisplay(day) {
      return (day < 10 ? '0' + day : day) + this.daySuffix;
    },
    getHourForDisplay(hour, index) {
      return hour < 10 ? '0' + hour : hour;
    },
    getMinuteForDisplay(minute) {
      return minute < 10 ? '0' + minute : minute;
    },
    getSecondForDisplay(second) {
      return second < 10 ? '0' + second : second;
    },
    isRequested(character) {
      return this.displayFormat.search(character) >= 0;
    },
    getDays() {
      let days = [];

      let daysNumberOfMonth = new Date(
        this.selectedYear,
        this.selectedMonth + 1,
        0
      ).getDate();

      for (let i = 1; i < daysNumberOfMonth + 1; i++) {
        days.push(i);
      }

      return days.map(day => {
        return { day, selected: days === this.selectedDay };
      });
    },
    updateDays() {
      this.days = this.getDays();
    },
    // Send data to upper component.
    sendDate() {
      const date = this.format
        ? this.format(this.formatedDate)
        : this.formatedDate;
      this.$emit('input', date);
    },
    // Set the initial date.
    setDate() {
      this.updateDays();

      // If a value property has been passed to the component, that will be
      // used instead of the current day.
      let date;

      if (this.min && this.max && !this.default) {
        date = new Date(this.min);
      } else if (this.default) {
        date = new Date(this.default);
      } else {
        date = new Date();
      }

      if (this.initialDate) {
        this.selectedDay = date.getDate() + 1;
      } else {
        this.selectedDay = date.getDate();
      }

      this.selectedSecond = date.getSeconds();
      this.selectedMinute = date.getMinutes();

      if (this.hourClock === '12-hour') {
        let current_houer = this.getHourIn12Base(date.getHours());
        this.selectedHour = current_houer.hour;
        this.selectedShift = current_houer.shift;
      } else {
        this.selectedHour = date.getHours();
      }

      this.selectedDay = date.getDate();
      this.selectedMonth = date.getMonth();
      this.selectedYear = date.getFullYear();
      this.sendDate();
    }
  },
  created() {
    // Set the date when the component was created
    this.setDate();
  },
  updated() {
    // Send the data on change
    this.sendDate();
  }
};
</script>

<style scoped>
.repo-datetime-vue {
  border: 1px solid #ccc;
  display: inline-block;
  margin: 5px 0;
}

.repo-datetime-vue-wrapper {
}

.repo-datetime-vue-select-wrapper {
  position: relative;
  width: 50px;
  display: inline-block;
  padding-right: 14px;
  text-align: center;
}

.repo-datetime-vue-select-wrapper .repo-datetime-vue-select {
  border: 0 none;
  outline: none;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  background: #fff;
  text-align-last: center;
  height: 40px;
  margin: 0;
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width: 480px) {
  /* Styles */
  .repo-datetime-vue-select-wrapper::after {
    content: ' ';
    display: block;
    position: absolute;
    top: 50%;
    right: 3px;
    margin-top: -3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #808080 transparent transparent transparent;
  }
}
</style>