class Invoice extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        "styles": [
                {
                    "name": "Page Internal Styles",
                    "type": "internal",
                    "style": ".body { background-color:lightblue;}"
                },
                {
                    "name": "Bootstrap",
                    "type": "external",
                    "url": "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                },
                {
                    "name": "Invoice CSS",
                    "type": "external",
                    "url": "./css/style.css"
                }
            ],
        "config": {},
        "data": {}, // this is default master data i.e. Invoice Title, Date Label
        'wrapper': "invoice-wrapper",
        'invoice_background': "invoice-background",
        'background_img': "background-img",
        'bottom': 'square-bottom',
        'invoice_content': 'invoice_content',
        'invoice_title': 'invoice-title',
        'invoice_header': 'invoice-header',
        'invoice_header_logo': 'invoice-header-logo',
        'invoice_details': 'invoice-details',
        'invoice_no': 'invoice-no',
        'invoice_date': 'invoice-date',
        'invoice_due_date': 'invoice-due-date',
        'invoice_po_number': 'invoice-po-number',
        'invoice_company_details': 'invoice-company-details',
        'org_name': 'org-name',
        'org_gst_no': 'org-gst-no',
        'org_address': 'org-address',
        'org_address_line1': 'org-address-line-1',
        'org_address_city': 'org-address-city',
        'org_address_state': 'org-address-state',
        'org_address_country': 'org-address-country',
        'org_address_pincode': 'org-address-pincode',
        'org_address_mobile': 'org-mobile',
        'org_address_email': 'org-email',
        'org_address_website': 'org-website',
        'customer_details_section': 'customer-details-section',
        'billing_address_section': 'billing-address-section',
        'details_header1': 'details-header',
        'party_billing_address': 'details-cell party-billing-address',
        'party_name1': 'party-name',
        'party_address_line1': 'party-address-line-1',
        'party_address_line2': 'party-address-line-2',
        'party_address_city': 'party-address-city',
        'party_address_state': 'party-address-state',
        'party_address_country': 'party-address-country',
        'party_address_pincode': 'party-address-pincode',
        'party_address_email': 'party-address-email',
        'party_address_mobile': 'party-mobile',
        'shipping_address_section': 'shipping-address-section',
        'party_shipping_address': 'details-cell party-shipping-address',
        'details_header2': 'details-header',
        'party_name2': 'party-name',
        'item_section': 'item-section',
        'content_table': 'content-table',
        'content_header_row': 'content-header-row',
        'content_header': 'content-header',
        'content_row': 'content-row',
        'content_cell': 'content-cell',
        'content_footer_row': 'content-footer-row',
        'content_footer': 'content-footer',
        'amount_in_words': 'amount-in-words',
        'invoice_footer': 'invoice-footer',
        'invoice_bank_details': 'invoice-bank-details',
        'invoice_terms': 'invoice-terms',
        'invoice_signatures': 'invoice-signatures',
        'invoice_cashier_signature': 'invoice-cashier-signature',
        'invoice_party_signature': 'invoice-party-signature',

    };

    defaultData = { // 
        title: 'TAX INVOICE',
        src: '/img/tata.png',
        company: {
            name: 'TATA MOTORS LIMITED',
            gstin: '27AAACT2727Q1ZW',
            address: {
                line1: 'Nigadi Bhosari Road, PIMPRI',
                city: 'Pune',
                state: 'MAHARASHTRA',
                country: 'India',
                pincode: '411018',
                mobile: '9999999999',
                email: 'Swipe@getswipe.in',
                website: 'www.getswipe.in'
            }
        },
        invoiceDetails: {
            invoiceNo: 'INV-1',
            invoiceDate: '17 Jun 2023',
            dueDate: '17 Jun 2023',
            poNumber: '17 Jun 2023'
        },
        customerDetails: {
            billingAddress: {
                name: 'Natarajan Chandrasekaran',
                line1: 'Survey 115/1, ISB Rd, Financial District',
                line2: 'Gachibowli, Nanakramguda',
                city: 'Nanakramguda',
                state: 'TELANGANA',
                country: 'INDIA',
                pincode: '500032',
                email: 'natrajan@gmail.com',
                mobile: '9999999999'
            },
            shippingAddress: {
                name: 'Natarajan Chandrasekaran',
                line1: 'Survey 115/1, ISB Rd, Financial District',
                line2: 'Gachibowli, Nanakramguda',
                city: 'Nanakramguda',
                state: 'TELANGANA',
                country: 'INDIA',
                pincode: '500032',
                email: 'natrajan@gmail.com',
                mobile: '9999999999'
            }
        },
        items: [
            {
                id: 1,
                item: 'Tata Nexon',
                hsn: '87038070',
                rate: '8,05,000.00',
                quantity: 1,
                taxableValue: '8,05,000.00',
                taxAmount: '1,44,900.00 (18%)',
                totalAmount: '9,49,900.00'
            },
            {
                id: 2,
                item: 'Car accessories Kit',
                hsn: '87089900',
                rate: '2,117.80',
                quantity: 1,
                taxableValue: '2,117.80',
                taxAmount: '381.20 (18%)',
                totalAmount: '2,499.00'
            },
            {
                id: 3,
                item: 'Car accessories Kit',
                hsn: '87089900',
                rate: '2,117.80',
                quantity: 1,
                taxableValue: '2,117.80',
                taxAmount: '381.20 (18%)',
                totalAmount: '2,499.00'
            },
            {
                id: 4,
                item: 'Car accessories Kit',
                hsn: '87089900',
                rate: '2,117.80',
                quantity: 1,
                taxableValue: '2,117.80',
                taxAmount: '381.20 (18%)',
                totalAmount: '2,499.00'
            },
            {
                id: 5,
                item: 'Car accessories Kit',
                hsn: '87089900',
                rate: '2,117.80',
                quantity: 1,
                taxableValue: '2,117.80',
                taxAmount: '381.20 (18%)',
                totalAmount: '2,499.00'
            },
            // {
            //     id: 1,
            //     item: 'Tata Nexon',
            //     hsn: '87038070',
            //     rate: '8,05,000.00',
            //     quantity: 1,
            //     taxableValue: '8,05,000.00',
            //     taxAmount: '1,44,900.00 (18%)',
            //     totalAmount: '9,49,900.00'
            // },
            // {
            //     id: 2,
            //     item: 'Car accessories Kit',
            //     hsn: '87089900',
            //     rate: '2,117.80',
            //     quantity: 1,
            //     taxableValue: '2,117.80',
            //     taxAmount: '381.20 (18%)',
            //     totalAmount: '2,499.00'
            // },
            // {
            //     id: 3,
            //     item: 'Car accessories Kit',
            //     hsn: '87089900',
            //     rate: '2,117.80',
            //     quantity: 1,
            //     taxableValue: '2,117.80',
            //     taxAmount: '381.20 (18%)',
            //     totalAmount: '2,499.00'
            // },
            // {
            //     id: 4,
            //     item: 'Car accessories Kit',
            //     hsn: '87089900',
            //     rate: '2,117.80',
            //     quantity: 1,
            //     taxableValue: '2,117.80',
            //     taxAmount: '381.20 (18%)',
            //     totalAmount: '2,499.00'
            // },
            // {
            //     id: 5,
            //     item: 'Car accessories Kit',
            //     hsn: '87089900',
            //     rate: '2,117.80',
            //     quantity: 1,
            //     taxableValue: '2,117.80',
            //     taxAmount: '381.20 (18%)',
            //     totalAmount: '2,499.00'
            // }

        ],
        total: {
            totalInWords: 'INR Nine Lakh, Fifty-Two Thousand, Three Hundred And Ninety-Nine Rupees Only'
        },
        tableData: {
            totalItems: { label: 'Total Items / Qty', value: '2 / 2.000' },
            row1: ['8,07,117.80', '1,45,281.20', '9,52,399.00'],
            taxableAmount: { label: 'Taxable Amount', value: '₹8,07,117.80' },
            igst: { label: 'IGST 18.0%', value: '₹1,45,281.20' },
            total: { label: 'Total', value: '₹9,52,399.00' }
        },
        bankDetails: {
            bankName: 'YES BANK',
            accountNo: '66789999922445',
            ifsc: 'YESB0BNA567',
            branch: 'Kodihalli'
        },
        qrCode: './img/qr.png',
        terms: [
            '1. Goods once sold cannot be taken back or exchanged.',
            '2. We are not the manufacturers; the company will stand for warranty as per their terms and conditions.'
        ],
        signature: {
            companyName: 'For TATA MOTORS LIMITED',
            authorizedSignature: '/img/sign.png'
        }
    };

    data = {};
    config = {};
    constructor() {
        super();
        this.config = this.defaultConfig;
        this.data = this.defaultData;
    };

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        return element;
    }

    renderComponent() {
        // Create the main wrapper element
        const wrapper = this.createElement('div', this.config.wrapper);

        // create the background element
        const invoice_background = this.createElement('div', this.config.invoice_background);

        // create the background-img element
        const background_img = this.createElement('div', this.config.background_img);

        // create the img tag
        const img = this.createElement('img');
        img.setAttribute('src', '/img/background-img.png');

        const bottom = this.createElement('div', this.config.bottom);

        // Additional Contact Information 
        const invoice_content = this.createElement('div', this.config.invoice_content);
        const invoice_title = this.createElement('h1', this.config.invoice_title);
        invoice_title.textContent = this.data.title;
        invoice_content.appendChild(invoice_title);

        const invoice_header = this.createElement('div', this.config.invoice_header);
        invoice_content.appendChild(invoice_header);

        const invoice_header_logo = this.createElement('div', this.config.invoice_header_logo);
        const logoimg = this.createElement('img');
        logoimg.src = this.data.src;
        // logoimg.alt = this.data.invoice.alt;
        invoice_header_logo.appendChild(logoimg);
        invoice_header.appendChild(invoice_header_logo);

        // invoice details
        const invoice_details = this.createElement('div', this.config.invoice_details);
        const invoice_no = this.createElement('div', this.config.invoice_no);
        const invoice_date = this.createElement('div', this.config.invoice_date);
        const invoice_due_date = this.createElement('div', this.config.invoice_due_date);
        const invoice_po_number = this.createElement('div', this.config.invoice_po_number);

        // Instead of using a loop here:
        invoice_no.textContent = `Invoice No: ${this.data.invoiceDetails.invoiceNo}`;
        invoice_date.textContent = `Invoice Date: ${this.data.invoiceDetails.invoiceDate}`;
        invoice_due_date.textContent = `Due Date: ${this.data.invoiceDetails.dueDate}`;
        invoice_po_number.textContent = `PO Number: ${this.data.invoiceDetails.poNumber}`;


        invoice_details.appendChild(invoice_no);
        invoice_details.appendChild(invoice_date);
        invoice_details.appendChild(invoice_due_date);
        invoice_details.appendChild(invoice_po_number);
        invoice_header.appendChild(invoice_details);

        // invoice company details and address
        const invoice_company_details = this.createElement('div', this.config.invoice_company_details);
        const org_name = this.createElement('div', this.config.org_name);
        const org_gst_no = this.createElement('div', this.config.org_gst_no);
        const org_address = this.createElement('div', this.config.org_address);

        let company = this.data.company;
        // Set company name and GSTIN
        org_name.textContent = `${company.name}`;
        org_gst_no.textContent = `GSTIN: ${company.gstin}`;
        // Loop through company address and append each property
        const addressKeys = ['line1', 'city', 'state', 'country', 'pincode', 'mobile', 'email', 'website'];
        addressKeys.forEach(key => {
            const element = this.createElement('span', this.config[`org_address_${key}`]);
            element.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${company.address[key]}`;
            org_address.appendChild(element);
        });

        invoice_company_details.appendChild(org_name);
        invoice_company_details.appendChild(org_gst_no);
        invoice_company_details.appendChild(org_address);
        invoice_header.appendChild(invoice_company_details);

        // invoice customer details
        const customer_details_section = this.createElement('div', this.config.customer_details_section);

        // billing-address-section
        const billing_address_section = this.createElement('div', this.config.billing_address_section);
        const details_header1 = this.createElement('div', this.config.details_header1);
        const party_billing_address = this.createElement('div', this.config.party_billing_address);
        const party_name1 = this.createElement('div', this.config.party_name1);


        let customerDetail = this.data.customerDetails;
        // Loop through company address and append each property
        const billingAddressKeys = ['name', 'line1', 'line2', 'city', 'state', 'country', 'pincode', 'mobile', 'email'];
        billingAddressKeys.forEach(key => {
            if (key == 'name') {
                party_name1.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${customerDetail.billingAddress[key]}`;
                party_billing_address.appendChild(party_name1);
            }
            else {
                const element = this.createElement('span', this.config[`party_address_${key}`]);
                element.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${customerDetail.billingAddress[key]}`;
                party_billing_address.appendChild(element);
            }
        });

        billing_address_section.appendChild(details_header1);
        billing_address_section.appendChild(party_billing_address);
        customer_details_section.appendChild(billing_address_section);
        invoice_content.appendChild(customer_details_section);

        // shipping address
        const shipping_address_section = this.createElement('div', this.config.shipping_address_section);
        const party_shipping_address = this.createElement('div', this.config.party_shipping_address);
        const details_header2 = this.createElement('div', this.config.details_header2);
        const party_name2 = this.createElement('div', this.config.party_name2);

        const shippingAddressKeys = ['name', 'line1', 'line2', 'city', 'state', 'country', 'pincode', 'mobile', 'email'];
        shippingAddressKeys.forEach(key => {
            if (key == 'name') {
                party_name2.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${customerDetail.shippingAddress[key]}`;
                party_shipping_address.appendChild(party_name2);
            }
            else {
                const element = this.createElement('span', this.config[`party_address_${key}`]);
                element.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${customerDetail.shippingAddress[key]}`;
                party_shipping_address.appendChild(element);
            }
        });

        // access details header
        for (let x in customerDetail) {
            if (x.length == 14) {
                details_header1.textContent = `${x.charAt(0).toUpperCase() + x.slice(1)}`;
            }
            else {
                details_header2.textContent = `${x.charAt(0).toUpperCase() + x.slice(1)}`;
            }
        };

        shipping_address_section.appendChild(details_header2);
        shipping_address_section.appendChild(party_shipping_address);
        customer_details_section.appendChild(shipping_address_section);

        // Table Header
        const item_section = this.createElement('div', this.config.item_section);
        const content_table = this.createElement('table', this.config.content_table);
        const thead = this.createElement('thead');
        const content_header_row = this.createElement('tr', this.config.content_header_row);
        // const th = this.createElement('th', this.config.content_header);
        const tbody = this.createElement('tbody');

        // Create the tfoot element
        const tfoot = this.createElement('tfoot');
        let tableData = this.data.tableData;
        // First row: Total Items / Qty
        const row1 = this.createElement('tr');
        row1.classList.add('content-footer-row');
        const th1 = this.createElement('th');
        th1.colSpan = 5;
        th1.classList.add('content-footer');
        th1.textContent = `${tableData.totalItems.label}: ${tableData.totalItems.value}`;
        row1.appendChild(th1);

        // Adding the values from row1 array
        tableData.row1.forEach(value => {
            const th = this.createElement('th');
            th.classList.add('content-footer', 'right-align');
            th.textContent = value;
            row1.appendChild(th);
        });

        tfoot.appendChild(row1);

        // Second row: Taxable Amount
        const row2 = this.createElement('tr');
        row2.classList.add('content-footer-row');

        const td1 = this.createElement('td');
        td1.colSpan = 6;
        td1.rowSpan = 2;
        row2.appendChild(td1);

        const th2 = this.createElement('th');
        th2.classList.add('content-footer', 'right-align');
        th2.textContent = tableData.taxableAmount.label;
        row2.appendChild(th2);

        const th3 = this.createElement('th');
        th3.classList.add('content-footer', 'right-align');
        th3.textContent = tableData.taxableAmount.value;
        row2.appendChild(th3);

        tfoot.appendChild(row2);

        // Third row: IGST
        const row3 = this.createElement('tr');
        row3.classList.add('content-footer-row');

        const th4 = this.createElement('th');
        th4.classList.add('content-footer', 'right-align');
        th4.textContent = tableData.igst.label;
        row3.appendChild(th4);

        const th5 = this.createElement('th');
        th5.classList.add('content-footer', 'right-align');
        th5.textContent = tableData.igst.value;
        row3.appendChild(th5);

        tfoot.appendChild(row3);

        // Fourth row: Total
        const row4 = this.createElement('tr');
        row4.classList.add('content-footer-row');

        const td2 = this.createElement('td');
        td2.colSpan = 6;
        row4.appendChild(td2);

        const th6 = this.createElement('th');
        th6.classList.add('content-footer', 'total-text', 'right-align');
        th6.textContent = tableData.total.label;
        row4.appendChild(th6);

        const th7 = this.createElement('th');
        th7.classList.add('content-footer', 'total-text', 'right-align');
        th7.textContent = tableData.total.value;
        row4.appendChild(th7);

        tfoot.appendChild(row4);

        // thead fill data
        const tabledata = ['#', 'Item', 'HSN/ASN', 'Rate/Item', 'Qty', 'Taxable Value', 'Tax Amount', 'Amount'];
        tabledata.forEach(key => {
            const element = this.createElement('th', this.config.content_header);
            element.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
            content_header_row.appendChild(element);

        });

        // body data 
        this.data.items.forEach(item => {
            const row = this.createElement('tr', this.config.content_row);
            const cellSrNo = this.createElement('td', this.config.content_cell);
            const cellItem = this.createElement('td', this.config.content_cell);
            const cellHSN = this.createElement('td', this.config.content_cell);
            const cellRate = this.createElement('td', this.config.content_cell);
            const cellQuantity = this.createElement('td', this.config.content_cell);
            const cellTaxableValue = this.createElement('td', this.config.content_cell);
            const cellTaxAmount = this.createElement('td', this.config.content_cell);
            const cellTotalAmount = this.createElement('td', this.config.content_cell);

            cellSrNo.textContent = item.id;
            cellItem.textContent = item.item;
            cellHSN.textContent = item.hsn;
            cellRate.textContent = item.rate;
            cellQuantity.textContent = item.quantity;
            cellTaxableValue.textContent = item.taxableValue;
            cellTaxAmount.textContent = item.taxAmount;
            cellTotalAmount.textContent = item.totalAmount;

            row.appendChild(cellSrNo);
            row.appendChild(cellItem);
            row.appendChild(cellHSN);
            row.appendChild(cellRate);
            row.appendChild(cellQuantity);
            row.appendChild(cellTaxableValue);
            row.appendChild(cellTaxAmount);
            row.appendChild(cellTotalAmount);

            tbody.appendChild(row);
        });

        // tfoot data
        content_table.appendChild(thead);
        thead.appendChild(content_header_row);
        content_table.appendChild(tbody);
        content_table.appendChild(tfoot);
        item_section.appendChild(content_table);
        invoice_content.appendChild(item_section);

        // amount in words
        const amount_in_words = this.createElement('div', this.config.amount_in_words);
        const p = this.createElement('p');
        p.textContent = `Total amount (in words): ${this.data.total.totalInWords}`;
        amount_in_words.appendChild(p);
        invoice_content.appendChild(amount_in_words);

        // invoice-footer
        const invoice_footer = this.createElement('div', this.config.invoice_footer);
        const invoice_bank_details = this.createElement('div', this.config.invoice_bank_details);
        const strong = this.createElement('strong');
        let br = this.createElement('br');
        strong.textContent = 'Bank Details: ';
        invoice_bank_details.appendChild(strong);
        invoice_bank_details.appendChild(br);
        const invoice_terms = this.createElement('div', this.config.invoice_terms);
        const strong1 = this.createElement('strong');
        invoice_terms.appendChild(strong1);
        strong1.textContent = 'Terms and Conditions: ';
        const invoice_signatures = this.createElement('div', this.config.invoice_signatures);
        const invoice_cashier_signature = this.createElement('p', this.config.invoice_cashier_signature);
        const invoice_party_signature = this.createElement('div', this.config.invoice_party_signature);
        const img1 = this.createElement('img');
        img1.setAttribute('src', this.data.signature.authorizedSignature);
        const para = this.createElement('p',);
        para.textContent = 'Authorized Signature';

        // Bank Details
        let bankdata = this.data.bankDetails;
        for (let [index, data] of Object.entries(bankdata)) {
            const element = this.createElement('span');
            const br = this.createElement('br');
            element.textContent = `${index.charAt(0).toUpperCase() + index.slice(1)}: ${data}`;
            invoice_bank_details.appendChild(element);
            invoice_bank_details.appendChild(br);
        }

        // terms and condition
        for (let data of this.data.terms) {
            const element = this.createElement('p');
            element.textContent = `${data}`;
            invoice_terms.appendChild(element);
        }

        // signature   
        invoice_cashier_signature.textContent = this.data.signature.companyName;
        invoice_signatures.appendChild(invoice_cashier_signature);
        invoice_signatures.appendChild(invoice_party_signature);
        invoice_party_signature.appendChild(img1);
        invoice_party_signature.appendChild(para);

        invoice_footer.appendChild(invoice_bank_details);
        invoice_footer.appendChild(invoice_terms);
        invoice_footer.appendChild(invoice_signatures);
        invoice_content.appendChild(invoice_footer);

        background_img.appendChild(img);
        invoice_background.appendChild(background_img);
        invoice_background.appendChild(bottom);
        wrapper.appendChild(invoice_background);
        wrapper.appendChild(invoice_content);
        this.appendChild(wrapper);
    }
    connectedCallback() {
        this.renderComponent();
    };

    attributeChangedCallback(name, oldValue, newValue) {
        try {
            if (name === 'config' && typeof newValue === 'string') {
                this.config = Object.assign(this.config, JSON.parse(newValue));
            }
            if (name === 'data' && typeof newValue === 'string') {
                this.data = Object.assign(this.data, JSON.parse(newValue));
            }
        } catch (e) {
            console.error('Error parsing JSON for', name, ':', e);
        }
    }
}

customElements.define('invoice-component', Invoice);