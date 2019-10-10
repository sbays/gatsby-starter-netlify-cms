import React from "react";
import { navigate } from "gatsby-link";
import Layout from "../../components/Layout";
import Styled from "styled-components";
import { formatGreen, defaultSpacing } from "../../variables";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const ContactWrapper = Styled.div`
  display: flex;
  flex-direction: row;
  >div {
    padding: 0 10px;
    width: 50%;
  }
  .page-header {
    padding-bottom: 9px;
    margin: 0 0 ${defaultSpacing};
    border-bottom: 1px solid #eee;
  }
  .page-header h1, .contact-page__details {
    color: ${formatGreen};
  }
  div.contact-page__details {
    padding-left: 2*${defaultSpacing};
    a {
      margin-bottom: ${defaultSpacing};
    }
    p {
      margin-bottom: 0;
    }
  }
`;

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <ContactWrapper>
                <div>
                  <form
                    name="contact"
                    method="post"
                    action="/contact/thanks/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                  >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div hidden>
                      <label>
                        Don’t fill this out:{" "}
                        <input name="bot-field" onChange={this.handleChange} />
                      </label>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={"name"}>
                        Your name
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type={"text"}
                          name={"name"}
                          onChange={this.handleChange}
                          id={"name"}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={"email"}>
                        Email
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type={"email"}
                          name={"email"}
                          onChange={this.handleChange}
                          id={"email"}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={"message"}>
                        Message
                      </label>
                      <div className="control">
                        <textarea
                          className="textarea"
                          name={"message"}
                          onChange={this.handleChange}
                          id={"message"}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <button className="button is-link" type="submit">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
                <div className="contact-page__details">
                  <div className="page-header">
                    <h1>Contact Us</h1>
                  </div>
                  <a href="mailto:info@formatextend.com">
                    info@formatextend.com
                  </a>

                  <p>Format</p>
                  <p>25 Lonsdale Rd</p>
                  <p>London</p>
                  <p>NW6 6RA</p>
                  <p>020 7625 5007</p>
                </div>
              </ContactWrapper>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
