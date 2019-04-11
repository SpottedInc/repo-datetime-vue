<template>
  <div class="vue-datetime-picker-2">
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
          :value="index"
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
  name: 'VueDatetimePicker2',
  props: {
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
      required: false
    },
    monthSuffix: {
      type: String,
      required: false
    },
    daySuffix: {
      type: String,
      required: false
    },
    hourClock: {
      type: String,
      required: false,
      default: '24-hour'
    },
    displayFormat: {
      type: String,
      required: false,
      default: 'ymdhis'
    },
    selectClassName: {
      type: String,
      required: false,
      default: 'date-dropdown-select'
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
      default: 'date-dropdown-select-wrapper'
    },
    containerClassName: {
      type: String,
      required: false,
      default: 'date-dropdown-container'
    }
  },
  data() {
    return {
      days: [],
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
    // Returns a formatted date e.g. 01.02.2018.
    calculatedDate() {
      const day =
        this.selectedDay >= 10 ? this.selectedDay : `0${this.selectedDay}`;

      const month =
        this.selectedMonth + 1 >= 10
          ? this.selectedMonth + 1
          : `0${this.selectedMonth + 1}`;

      const hour =
        this.selectedHour >= 10 ? this.selectedHour : `0${this.selectedHour}`;

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

      return years.map(year => {
        return { year, selected: year === this.selectedYear };
      });
    }
  },
  methods: {
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
      return (
        (hour < 10 ? '0' + hour : hour) +
        (this.hourClock === '12-hour' ? (index >= 12 ? ' p.m' : ' a.m') : '')
      );
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
        ? this.format(this.calculatedDate)
        : this.calculatedDate;
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
      this.selectedHour = date.getHours();
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
body {
  font-family: sans-serif;
}

.vue-datetime-picker-2 {
  display: table-row;
}

.date-dropdown-select-wrapper {
  position: relative;
  display: table-cell;
}

.vue-datetime-picker-2 select {
  width: 100%;
  float: left;
  border: 0 none;
  outline: none;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  padding-left: 10px;
  background: #fff;
  text-align-last: center;
  height: 40px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.date-dropdown-select-wrapper:first-child select {
  border-left: 1px solid #ccc;
}

.date-dropdown-select-wrapper:last-child select {
  border-right: 1px solid #ccc;
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width: 480px) {
  /* Styles */
  .date-dropdown-select-wrapper::after {
    content: ' ';
    display: block;
    position: absolute;
    top: 50%;
    right: 7px;
    margin-top: -3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #808080 transparent transparent transparent;
  }
}
</style>