import Helmet from 'react-helmet';
import path from 'path';
export default function renderFullPage(html, initialState, data){
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
        ${process.env.NODE_ENV === 'production' ? `<link href="${assetsManifest['/app.css']}" rel='stylesheet' type='text/css'/>` : ''}
        <style>
          div[className="optional-helper-text"],
          .optional-helper-text{
            font-family:monospace;
            padding:5px;
          }
        </style>
        <script>let routingData=${JSON.stringify(data)};</script>
      </head>
      <body>
        <div class="optional-helper-text basehtml-optional-helper-text">
          <b><i>Scrollable ↧</i></b>
          <br/>
          Below are listed the main steps for rendering this MERN app. To see the full effect please click the two example buttons below, and realize that the database has been seeded with pseudo-data.
          <br/><br/>
          1) After all backend [mongo,node] calls have been parsed "/server/server.js" renders this file ("/config/server/basehtml.js"), setting the initial HTML and incorporating webpack settings
        </div>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>

        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};
