import Head from "next/head";

import CONSTANTS from "../helpers/constants";

const SEO = ({ slug = "", description = "" }) => {
  const ogURL = `${CONSTANTS.APP_URL}/${slug}`;
  const title = "notesbin.xyz";
  let content = "";
  if (description.length === 0) {
    content = "Share notes with anyone, anywhere";
  } else {
    content = "Shared note";
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Neeraj Lagwankar" />
        <meta name="description" content="Share notes with anyone, anywhere" />
        <meta property="og:url" content={ogURL} />
        <meta property="og:description" content={content} />
        <meta property="og:title" content={content} />
        <meta property="og:image" content="https://notesbin.xyz/notesbin_og.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="https://twitter.com/neeraj_artx" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="Share notes with anyone, anywhere" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
        <script
          async
          defer
          data-domain="notesbin.xyz"
          src="https://stats.notesbin.xyz/js/index.js"></script>
      </Head>
    </div>
  );
};

export default SEO;
