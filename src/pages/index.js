import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// https://facebookincubator.github.io/infima/docs/layout/grid

const features = [
  {
    title: <>Peer-to-peer</>,
    imageUrl: 'img/feature_p2p.svg',
    description: (
      <>
        Traffic goes directly between devices with installed Husarnet client over the internet. With no central cloud in between.
      </>
    ),
  },
  {
    title: <>Low Latency</>,
    imageUrl: 'img/feature_latency.svg',
    description: (
      <>
        Devices communicate over the internet, using lowest latency path. If your devices are in the single network the traffic between them goes only within that network.
      </>
    ),
  },
  {
    title: <>Security and Privacy</>,
    imageUrl: 'img/feature_security.svg',
    description: (
      <>
        Securirty architecture exceedind industry standards. Your data never leaves your device unecrypted. Perfect Forward Secrecy (PFC) enabled by default.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className="text--center">{title}</h3>
      <p  className="text--center">{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className="hero hero--dark">

      {/* <header className={classnames('hero hero--dark', styles.heroBanner)}> */}

        <div className="container ">
          
          {/* <div className={classnames("row", styles.heroBanner)}> */}
          <div className="row">
            <div className={classnames("col col--4", styles.heroBanner)}>
            {/* <div className="col col--4"> */}
              {/* CSS BEM */}
              <h1 className="hero__title">{siteConfig.title}</h1> 
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              
              <div className={styles.buttons}>
                <Link
                  className={classnames(
                   'button button--primary button--outline button--lg',
                   styles.getStarted,
                 )}
                  to={useBaseUrl('docs/begin-linux')}>
                  Get Started
                </Link>
              </div>
            </div>
            <div className="col col--8">
              <img className={styles.heroImg} src="img/connect_devices.png" />
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
