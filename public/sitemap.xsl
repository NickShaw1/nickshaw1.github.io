<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>Sitemap — nickshawqa.com</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            background: #0a0a0a;
            color: #b0b0b0;
            font-family: 'Courier New', Courier, monospace;
            font-size: 13px;
            padding: 48px 24px;
            min-height: 100vh;
          }

          .wrap { max-width: 860px; margin: 0 auto; }

          header {
            margin-bottom: 40px;
            padding-bottom: 24px;
            border-bottom: 1px solid #1e1e1e;
          }

          h1 {
            font-size: 13px;
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #b0b0b0;
            margin-bottom: 8px;
          }

          h1 span { color: #0AFF9D; }

          .meta {
            font-size: 11px;
            color: #888888;
            letter-spacing: 0.05em;
          }

          table { width: 100%; border-collapse: collapse; }

          thead tr { border-bottom: 1px solid #1e1e1e; }

          th {
            text-align: left;
            font-size: 10px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #888888;
            padding: 0 12px 12px 0;
            font-weight: normal;
          }

          th:last-child, td:last-child { text-align: right; padding-right: 0; }

          td {
            padding: 10px 12px 10px 0;
            border-bottom: 1px solid #141414;
            vertical-align: middle;
          }

          tr:last-child td { border-bottom: none; }

          td a { color: #b0b0b0; text-decoration: none; }
          td a:hover { color: #0AFF9D; }

          .section-row td {
            padding-top: 28px;
            padding-bottom: 8px;
            border-bottom: 1px solid #1e1e1e;
            font-size: 10px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #0AFF9D;
          }

          .priority, .lastmod { color: #888888; font-size: 11px; white-space: nowrap; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <h1>nick<span>.</span>shaw — sitemap</h1>
            <p class="meta">
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs indexed
            </p>
          </header>

          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last modified</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url | sitemap:urlset/comment()">
                <xsl:choose>
                  <xsl:when test="self::comment()">
                    <tr class="section-row">
                      <td colspan="3"><xsl:value-of select="normalize-space(.)"/></td>
                    </tr>
                  </xsl:when>
                  <xsl:otherwise>
                    <tr>
                      <td>
                        <a href="{sitemap:loc}">
                          <xsl:value-of select="sitemap:loc"/>
                        </a>
                      </td>
                      <td class="lastmod"><xsl:value-of select="sitemap:lastmod"/></td>
                      <td class="priority"><xsl:value-of select="sitemap:priority"/></td>
                    </tr>
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
