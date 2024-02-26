import styles from "./Home.module.css"
import Image from "next/image";

const Home = async () => {

  return <div className={styles.container}>
    <div className={styles.textContainer}>
      <h1 className={styles.title}>Creative Thoughts Agency</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam corrupti vero beatae! Aut cum perferendis consectetur atque id assumenda impedit ipsam et cumque quia, quam maiores repellat debitis excepturi.
      </p>
      <div className={styles.buttons}>
        <button className={styles.button}>Learn More</button>
        <button className={styles.button}>Contact</button>
      </div>
      <div className={styles.brands}>
        <Image src="/brands.png" alt="" fill className={styles.brandImg} />
      </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.gif" alt="" fill className={styles.heroImg} />
      </div>
  </div>;
};

export default Home;