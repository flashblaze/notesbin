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
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="https://twitter.com/neeraj_artx" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="Share notes with anyone, anywhere" />
      </Head>
    </div>
  );
};

export default SEO;
