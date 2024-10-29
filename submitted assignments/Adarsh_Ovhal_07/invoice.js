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
      companyName: "TATA Technologies",
      gstNo: "27AAKCS1234H1Z5",
      title: "Tax Invoice",
      invoiceNumber: "INV-123456",
      invoiceDate: "2023-10-01",
      dueDate: "2023-10-15",
      poNumber: "PO-456789",
      logo: "./img/tata.png",
      qr: "./img/qr.png", 
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
  detailsDiv.appendChild(this.createElement("div", "invoice-no", `Invoice #: ${this.data.invoiceNumber}`));
  detailsDiv.appendChild(this.createElement("div", "invoice-date", `Invoice Date: ${this.data.invoiceDate}`));
  detailsDiv.appendChild(this.createElement("div", "invoice-due-date", `Due Date: ${this.data.dueDate}`));
  detailsDiv.appendChild(this.createElement("div", "invoice-po-number", `PO Number: ${this.data.poNumber}`));
  invoiceHeader.appendChild(detailsDiv);

  // Company Details
  const companyDetailsDiv = this.createElement("div", "invoice-company-details");
  companyDetailsDiv.appendChild(this.createElement("div", "org-name", this.data.companyName));
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
  this.shadowRoot.appendChild(wrapper);

  this.loadStyles();
}


  loadStyles() {
    const styleSheet = document.createElement("link");
    styleSheet.rel = "stylesheet";
    styleSheet.href = "./css/style.css"; // Make sure this path is correct based on your project structure
    this.shadowRoot.appendChild(styleSheet);
  }
}

// Define the custom element
customElements.define("invoice-component", InvoiceComponent);
