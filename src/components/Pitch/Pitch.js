import React from "react";
import PropTypes from "prop-types";

const Pitch = props => {
  const { html, tagline, theme } = props;

  return (
    <React.Fragment>
      <section className="pitch">
        <h2>{tagline}</h2>
        <div className="pitchtext" dangerouslySetInnerHTML={{ __html: html }} />
      </section>

      {/* --- STYLES --- */}
      <style jsx>{`
        .pitch {
          align-items: center;
          background: ${theme.hero.background};
          background-size: cover;
          color: ${theme.text.color.primary.inverse};
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          padding-top: ${theme.header.height.homepage};
          padding-bottom: ${theme.header.height.homepage};
        }

        .pitchtext p {
          margin-bottom: 2em;
        }

        h2 {
          text-align: center;
          font-size: ${theme.hero.h1.size};
          margin: ${theme.space.stack.l};
          color: ${theme.hero.h1.color};
          line-height: ${theme.hero.h1.lineHeight};
          text-remove-gap: both 0 "Open Sans";

          :global(strong) {
            position: relative;

            &::after,
            &::before {
              content: "›";
              color: ${theme.text.color.attention};
              margin: 0 ${theme.space.xs} 0 0;
              text-shadow: 0 0 ${theme.space.s} ${theme.color.neutral.gray.k};
            }
            &::after {
              content: "‹";
              margin: 0 0 0 ${theme.space.xs};
            }
          }
        }

        .pitchtext {
          display: block;
          font-size: 16px;
          text-align: center;
          padding-right: 15%;
          padding-left: 15%;
          color: ${theme.pitch.text.color};
        }

        @from-width tablet {
          h2 {
            max-width: 90%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.3)`};
          }
        }

        @from-width desktop {
          h2 {
            max-width: 80%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.5)`};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Pitch.propTypes = {
  html: PropTypes.string.isRequired,
  tagline: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Pitch;
