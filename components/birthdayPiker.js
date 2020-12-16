import styles from './layout.module.css';
export default function BirthdayPiker({ value, setFunc, year, month, day, css }) {
    const createYear = () => {
        const today = new Date();
        const year = today.getFullYear();
        let items = [];
        for (let i = year; i >= year - 100; i--) {
            items.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return items;
    };

    const createMonth = () => {
        let items = [];
        for (let i = 1; i <= 12; i++) {
            items.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return items;
    };

    function createDay(tempYear, tempMonth) {
        const days = new Date(tempYear, tempMonth, 0).getDate();
        let items = [];
        for (let i = 1; i <= days; i++) {
            items.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return items;
    }

    const handleYearChange = (event) => {
        setFunc({ ...value, year: event.target.value });
    };
    const handleMonthChange = (event) => {
        setFunc({ ...value, month: event.target.value });
    };
    const handleDayChange = (event) => {
        setFunc({ ...value, day: event.target.value });
    };

    return (
        <div className={css}>
            <select className='wid40' onChange={handleYearChange} value={year}>
                {createYear()}
            </select>
            <span className={styles.formSelectSpan}>年</span>
            <select className='wid30' onChange={handleMonthChange} value={month}>
                {createMonth()}
            </select>
            <span className={styles.formSelectSpan}>月</span>
            <select className='wid30' onChange={handleDayChange} value={day}>
                {createDay(year, month)}
            </select>
            <span className={styles.formSelectSpan}>日</span>
        </div>
    );
}
