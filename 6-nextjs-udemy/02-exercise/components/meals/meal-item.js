import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";

// parameters : initdb.js 참고
export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
          {/* fill 속성 */}
          {/* - DB로부터 동적으로 load */}
          {/* - 너비와 높이를 사전에 모를 때, 명시적으로 설정하는 대신 대안으로 'fill' 속성 사용 */}
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
