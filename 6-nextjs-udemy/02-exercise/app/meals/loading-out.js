// loading.js --> 로딩화면 적용 O
// loading-out.js --> 로딩화면 적용 X

import classes from "./loading.module.css";

export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}
