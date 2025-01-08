class InvoiceComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.config = {
      backgroundDiv: "invoice-wrapper",
      backgroundClass: "invoice-background",
      buttonClass: "btn btn-primary",
      rec1Class: "rect-top-1",
      rec2Class: "rect-top-2",
      rec3Class: "rect-top-3",
      rec4Class: "rect-bottom-1",
      rec5Class: "rect-bottom-2",
      rec6Class: "rect-bottom-3",
      lineClass: "line1",
      contentClass: "invoice-content",
      titleClass: "invoice-title",
      headerClass: "invoice-header",
      logoClass: "invoice-header-logo",
      qrClass: "qr",
      detailsClass: "invoice-details",
      addressClass: "org-address",
      detailsHeaderClass: "details-header",
      tableClass: "content-table",
      tableHeaderClass: "content-header",
      rightAlignClass: "right-align",
      totalClass: "total-amount",
      bankDetailsClass: "bank-details",
      termsClass: "terms primary",
      footerClass: "invoice-footer",
    };
    
    this.data = {
      Company:{
        name:"abc"
      },
      gstNo: "27AAKCS1234H1Z5",
      title: "Tax Invoice",
      uid: "INV-123456",
      invoiceDate: "2023-10-01",
      dueDate: "2023-10-15",
      poNumber: "PO-456789",
      logo: "http://127.0.0.1:8081/img/tata.png",
      qr: "http://127.0.0.1:8081/img/qr.png", 
      companyAddress: [
        
        "City: Pune",
        "State: MAHARASHTRA",
        "Country: India",
        "Pincode: 411018",
        "Mobile: 9999999999",
        "Email: Swipe@getswipe.in",
        "Website: www.getswipe.in",
      ],
      customer: {
        billing: {
          name: "Natarajan Chandrasekaran",
          address: [
            // "Survey 115/1, ISB Rd, Financial District",
            // "Gachibowli, Nanakramguda",
            "City: Nanakramguda",
            "State: TELANGANA",
            "Country: INDIA",
            "Pincode: 500032",
            "Email: natrajan@gmail.com",
            "Ph: 9999999999",
          ],
        },
        shipping: {
          name: "Natarajan Chandrasekaran",
          address: [
            "Survey 115/1, ISB Rd, Financial District",
            "Gachibowli, Nanakramguda",
            "City: Nanakramguda",
            "State: TELANGANA",
            "Country: INDIA",
            "Pincode: 500032",
            "Email: natrajan@gmail.com",
            "Ph: 9999999999",
          ],
        },
      },
      items: [
        { item: "Tata Nexon", hsn: "87038070", rate: "8,05,000.00", qty: 1,taxAmount: "1,44,900.00 (18%)", amount: "9,49,900.00", },
        { item: "Car accessories Kit", hsn: "87089900", rate: "2,117.80", qty: 1,taxAmount: "381.20 (18%)", amount: "2,499.00"},
      ],
      bankDetails: {
        bank: "YES BANK",
        account: "66789999922445",
        ifsc: "YESB0BNA567",
        branch: "Kodihalli",
      },
      terms: [
        "Terms: Goods once sold cannot be taken back or exchanged.",
      ],
      totalAmountInWords:
        "INR Nine Lakh, Fifty-Two Thousand, Three Hundred And Ninety-Nine Rupees Only.",
    };

    this.render();
  }

  static get observedAttributes() {
    return ["config", "data"];
  }

  connectedCallback() {
    this.addEventListener("submit", (event) => {
      const { companyName, invoiceNumber } = event.detail;
      console.log('event.detail:', event.detail);
      this.data= { ...this.data, ...event.detail };
      console.log('data:', this.data);
      this.render(); 
    });
  }
  attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
          if (name === 'config' && newValue) {
              try {
                console.log('config new valuehhh:', newValue);
                const newConfig = JSON.parse(newValue);
                this.config = { ...this.config, ...newConfig };
              } catch (e) {
                  console.error('Invalid config JSON:', e);
              }
          }
          if (name === 'data' && newValue) {
              try {
                console.log('data new value:', newValue);
                const newData = JSON.parse(newValue);
                this.data = { ...this.data,...newData };
                console.log('data:', this.data);
              } catch (e) {
                  console.error('Invalid data JSON:', e);
              }
          }
          this.render();
      }
  }
  createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }

  createTableHeaderCell(text) {
    const th = this.createElement("th", null, text);
    return th;
  }

  createTableCell(text) {
    const td = this.createElement("td", null, text);
    return td;
  }

  render() {
  // Clear previous content
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = '';
    } else {
        console.error('shadowRoot is undefined');
    }

  const wrapper = this.createElement("div", this.config.backgroundDiv);

  const backgroundDiv = this.createElement("div", this.config.backgroundClass);
  backgroundDiv.appendChild(this.createElement("div", this.config.rec1Class));
  backgroundDiv.appendChild(this.createElement("div", this.config.rec2Class));
  backgroundDiv.appendChild(this.createElement("div", this.config.rec3Class));
  backgroundDiv.appendChild(this.createElement("div", this.config.rec4Class));
  backgroundDiv.appendChild(this.createElement("div", this.config.rec5Class));
  backgroundDiv.appendChild(this.createElement("div", this.config.rec6Class));
  wrapper.appendChild(backgroundDiv);

  const invoiceContent = this.createElement("div", this.config.contentClass);

  // Invoice Title
  const invoiceTitle = this.createElement("h1", this.config.titleClass, this.data.title);
  invoiceContent.appendChild(invoiceTitle);

  // Invoice Header
  const invoiceHeader = this.createElement("div", this.config.headerClass);
  const logo = this.createElement("img", this.config.logoClass);
  logo.src = this.data.logo;
  logo.alt = "Logo";
  invoiceHeader.appendChild(logo);

  const qr = this.createElement("img", this.config.qrClass);
  qr.src = this.data.qr;
  qr.alt = "qr";
  invoiceHeader.appendChild(qr);

  const detailsDiv = this.createElement("div", this.config.detailsClass);
  detailsDiv.appendChild(this.createElement("div", "invoice-no", `Invoice #: ${this.data.uid}`));
  detailsDiv.appendChild(this.createElement("div", "invoice-date", `Invoice Date: ${this.data.invoiceDate}`));
  detailsDiv.appendChild(this.createElement("div", "invoice-due-date", `Due Date: ${this.data.dueDate}`));
  detailsDiv.appendChild(this.createElement("div", "invoice-po-number", `PO Number: ${this.data.poNumber}`));
  invoiceHeader.appendChild(detailsDiv);

  // Company Details
  const companyDetailsDiv = this.createElement("div", "invoice-company-details");
  companyDetailsDiv.appendChild(this.createElement("div", "org-name", this.data.Company.name));
  companyDetailsDiv.appendChild(this.createElement("div", "org-gst-no", this.data.gstNo));

  const orgAddressDiv = this.createElement("div", this.config.addressClass);
  this.data.companyAddress.forEach((line) => {
    orgAddressDiv.appendChild(this.createElement("div", null, line));
  });
  companyDetailsDiv.appendChild(orgAddressDiv);
  invoiceHeader.appendChild(companyDetailsDiv);
  invoiceContent.appendChild(invoiceHeader);

  // Customer Details
  const customerDetailsSection = this.createElement("div", "customer-details-section");
  const billingSection = this.createElement("div", "billing-address-section");
  billingSection.appendChild(this.createElement("div", this.config.detailsHeaderClass, "Billing Address:"));
  const billingAddressDiv = this.createElement("div", "details-cell party-billing-address");
  billingAddressDiv.appendChild(this.createElement("div", "party-name", this.data.customer.billing.name));
  this.data.customer.billing.address.forEach((line) => {
    billingAddressDiv.appendChild(this.createElement("div", null, line));
  });
  billingSection.appendChild(billingAddressDiv);
  customerDetailsSection.appendChild(billingSection);

  const shippingSection = this.createElement("div", "shipping-address-section");
  shippingSection.appendChild(this.createElement("div", this.config.detailsHeaderClass, "Shipping Address:"));
  const shippingAddressDiv = this.createElement("div", "details-cell party-shipping-address");
  shippingAddressDiv.appendChild(this.createElement("div", "party-name", this.data.customer.shipping.name));
  this.data.customer.shipping.address.forEach((line) => {
    shippingAddressDiv.appendChild(this.createElement("div", null, line));
  });
  shippingSection.appendChild(shippingAddressDiv);
  customerDetailsSection.appendChild(shippingSection);

  invoiceContent.appendChild(customerDetailsSection);

  // Items Table Section
  const items = this.createElement("div", "items");
  const table = this.createElement("table", this.config.tableClass);

  const thead = this.createElement("thead");
  const headerRow = this.createElement("tr");

  // Declare and collect all unique keys from the items array
  const allKeys = new Set();
  this.data.items.forEach((item) => {
    Object.keys(item).forEach((key) => {
    allKeys.add(key);
    });
  });

  // Create table header
  allKeys.forEach((key) => {
    headerRow.appendChild(this.createTableHeaderCell(key.charAt(0).toUpperCase() + key.slice(1)));
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = this.createElement("tbody");
  this.data.items.forEach((item) => {
    const row = this.createElement("tr");

    allKeys.forEach((key) => {
    row.appendChild(this.createTableCell(item[key] || ""));
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  items.appendChild(table);
  invoiceContent.appendChild(items);

  // Total Amount
  const totalDiv = this.createElement("div", this.config.totalClass);
  totalDiv.appendChild(this.createElement("div", null, `Total Amount in Words: ${this.data.totalAmountInWords}`));
  invoiceContent.appendChild(totalDiv);

  // Bank Details
  const bankDetailsDiv = this.createElement("div", this.config.bankDetailsClass);
  bankDetailsDiv.appendChild(this.createElement("div", null, `Bank: ${this.data.bankDetails.bank}`));
  bankDetailsDiv.appendChild(this.createElement("div", null, `Account: ${this.data.bankDetails.account}`));
  bankDetailsDiv.appendChild(this.createElement("div", null, `IFSC: ${this.data.bankDetails.ifsc}`));
  bankDetailsDiv.appendChild(this.createElement("div", null, `Branch: ${this.data.bankDetails.branch}`));
  invoiceContent.appendChild(bankDetailsDiv);

  // Terms
  const termsDiv = this.createElement("div", this.config.termsClass);
  termsDiv.appendChild(this.createElement("div", this.config.detailsHeaderClass,));
  this.data.terms.forEach((term) => {
    termsDiv.appendChild(this.createElement("div", null, term));
  });
  invoiceContent.appendChild(termsDiv);

  // Footer
  const footerDiv = this.createElement("div", this.config.footerClass);
  footerDiv.appendChild(this.createElement("div", null, `Authorized Signature`));
  footerDiv.appendChild(this.createElement("div", null, `Date: ${this.data.invoiceDate}`));
  invoiceContent.appendChild(footerDiv);

  wrapper.appendChild(invoiceContent);
  this.loadStyles();
  this.shadowRoot.appendChild(wrapper);

  
  }


  loadStyles() {
    const styleSheet = document.createElement("link");
    styleSheet.rel = "stylesheet";
    styleSheet.href = `http://127.0.0.1:8081/css/style.css`; // Make sure this path is correct based on your project structure
    this.shadowRoot.appendChild(styleSheet);
  }
}



class InvoiceFormComponent extends HTMLElement {
  constructor() {
      super();

      // Attach shadow DOM
      const shadow = this.attachShadow({ mode: 'open' });

      // External CSS (optional, for styling)
      const style = document.createElement('style');
      style.textContent = `
          form {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              width: 300px;
          }
          label {
              font-weight: bold;
          }
          input {
              padding: 0.5rem;
              border: 1px solid #ccc;
              border-radius: 4px;
          }
          .autocomplete-suggestions {
              position: absolute;
              background-color: white;
              border: 1px solid #ccc;
              z-index: 1000;
              max-height: 200px;
              overflow-y: auto;
              border-radius: 4px;
          }
          .suggestion-item {
              padding: 0.5rem;
              cursor: pointer;
          }
          .suggestion-item:hover {
              background-color: #f0f0f0;
          }
          button {
              padding: 0.5rem;
              border: none;
              background-color: #007bff;
              color: white;
              border-radius: 4px;
              cursor: pointer;
          }
          button:hover {
              background-color: #0056b3;
          }
      `;
      shadow.appendChild(style);

      // Form container
      this.form = document.createElement('form');
      shadow.appendChild(this.form);

      // Submit button
      this.submitButton = document.createElement('button');
      this.submitButton.type = 'submit';
      this.submitButton.textContent = 'Submit';
      this.form.appendChild(this.submitButton);

      // Handle form submission
      this.form.addEventListener('submit', (event) => {
          event.preventDefault();

          // Gather form data
          const formData = Object.fromEntries(new FormData(this.form));

          // Trigger a custom event with form data
          this.dispatchEvent(
              new CustomEvent('submit', {
                  detail: formData,
                  bubbles: true,
                  composed: true,
              })
          );

          // Reset form
          this.form.reset();
      });
  }
  connectedCallback() {
    // Get fields from an attribute or property
   // const fieldsData = this.dataset.fields ? JSON.parse(this.dataset.fields) : [];
   const fieldsData = [
    {"label": "Date:", "type": "date", "name": "invoiceDate", "row": 1},
      {"label": "Vno:", "type": "text", "name": "vno", "row": 1},
      {"label": "Invoice No:", "type": "text", "name": "config.invoice_no", "row": 1, "disabled": true},
      {
        "label": "Company:",
        "type": "text",
        "name": "companies",
        "className": "formly-company",
        "autoComplete": true
      },
      {"label": "Godown:", "type": "text", "name": "config.storageLocationId", "row": 2},
      {"label": "Supplier:", "type": "text", "name": "supplier", "row": 3},
      {"label": "Narr:", "type": "text", "name": "narr", "row": 3},
      {"label": "CST/IGST:", "type": "select", "name": "cst_igst", "row": 4, "options": [{"label": "CST", "value": "CST"}, {"label": "IGST", "value": "IGST"}]},
      {"label": "For LBT:", "type": "select", "name": "forlbt", "row": 4, "options": [{"label": "Yes", "value": "yes"}, {"label": "No", "value": "no"}]},
      {"label": "PO No:", "type": "text", "name": "po_no", "row": 4, "required": true}
];
    console.log("fieldsData",fieldsData)
    this.fields = fieldsData;
}

  set fields(fieldDefinitions) {
      // Clear existing fields
      this.form.innerHTML = '';

      // Add fields based on the provided definitions
      fieldDefinitions.forEach(({ label, type, name, className, required, disabled, autoComplete }) => {
          const fieldLabel = document.createElement('label');
          fieldLabel.textContent = label;

          const fieldInput = document.createElement('input');
          fieldInput.type = type;
          fieldInput.name = name;

          if (className) {
              fieldInput.className = className;
          }
          if (required) {
              fieldInput.required = true;
          }
          if (disabled) {
              fieldInput.disabled = true;
          }

          this.form.appendChild(fieldLabel);
          this.form.appendChild(fieldInput);

          // Handle autocomplete for specific fields
          if (autoComplete) {
              this.attachAutocomplete(fieldInput, name);
          }
      });

      // Append the submit button at the end
      this.form.appendChild(this.submitButton);
  }

  attachAutocomplete(inputElement, fieldName) {
      const suggestionsContainer = document.createElement('div');
      suggestionsContainer.className = 'autocomplete-suggestions';
      this.shadowRoot.appendChild(suggestionsContainer);
      inputElement.addEventListener('input', (e) => {
        console.log(e)
          const customEvent = new CustomEvent('requestData', {
              bubbles: true,
              cancelable: true,
              detail: {
                  data: {
                      dataModel: `${fieldName}`,
                      dataParams: JSON.stringify({
                        limit: 10,
                        where: {
                            name: { like: `${e.target.value}` }
                        }
                    }),
                      dataMapping: '{}',
                  },
              },
          });
          this.dispatchEvent(customEvent);
      });
      const responseHandler = (event) => {
        const companies = event.detail.res;
        console.log("companies",companies)
          suggestionsContainer.innerHTML = '';

          if (Array.isArray(companies) && companies.length > 0) {
              companies.forEach((company) => {
                  const suggestionItem = document.createElement('div');
                  suggestionItem.className = 'suggestion-item';
                  suggestionItem.textContent = company.name;
                  suggestionItem.addEventListener('click', () => {
                      inputElement.value = company.name;
                      suggestionsContainer.innerHTML = '';
                  });
                  suggestionsContainer.appendChild(suggestionItem);
              });

              // Position the suggestions container below the input
              const inputRect = inputElement.getBoundingClientRect();
              suggestionsContainer.style.top = `${inputRect.bottom}px`;
              suggestionsContainer.style.left = `${inputRect.left}px`;
              suggestionsContainer.style.width = `${inputRect.width}px`;
          } else {
              suggestionsContainer.innerHTML = '<div class="suggestion-item">No results found</div>';
          }
      };
      this.addEventListener('responseData', responseHandler);
  }
}

// Define the custom element
customElements.define('invoice-form-component', InvoiceFormComponent);
// Define the custom element
customElements.define("invoice-component", InvoiceComponent);
