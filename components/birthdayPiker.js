import styles from "./birthdayPiker.module.css";
import { useState, useEffect } from "react";

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

function Select({ onChange, value, text, label }) {
  return (
    <>
      <select className="wid30" onChange={onChange} value={value}>
        {text}
      </select>
      <span className={styles.formSelectSpan}>{label}</span>
    </>
  );
}

export default function DateGroup({ onChange }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    onChange([year, month, day].join("-"));
  }, [year, month, day]);

  return (
    <div className={"fx fx_nowrap fx_center fx_between"}>
      <Select
        onChange={(event) => setYear(event.target.value)}
        value={year}
        text={createYear()}
        label={"年"}
      />
      <Select
        onChange={(event) => setMonth(event.target.value)}
        value={month}
        text={createMonth()}
        label={"月"}
      />
      <Select
        onChange={(event) => setDay(event.target.value)}
        value={day}
        text={createDay(year, month)}
        label={"日"}
      />
    </div>
  );
}
