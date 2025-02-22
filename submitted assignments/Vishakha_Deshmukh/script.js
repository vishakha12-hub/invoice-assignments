class InvoiceComponent extends HTMLElement {
    // Default configuration with class names for various elements
    defaultConfig = {
        containerClass: 'invoice-container',
        headerClass: 'invoice-header',
        logoClass: 'invoice-logo',
        titleClass: 'invoice-title',
        detailsClass: 'invoice-details',
        bankDetailsClass:'bank-detail',
        sellerInfoClass: 'seller-info',
        clientInfoClass:'client-info',
        serviceClass:'service-info',
        clientInfoClass: 'client-info',
        itemsClass: 'invoice-items',
        tableClass: 'invoice-table',
        totalSectionClass: 'total-section',
        footerClass: 'invoice-footer',
        amountInWordsClass: 'amount-in-words',
        footerTextClass: 'invoice-footer-text',
        showBankDetails: true, 
        showTerms: true ,
        lineClass:'line',
        underlineClass:'underline',
        upperLineClass:'upper-line',
        downLineClass:'down-line',
        upperBoxClass:'upper-box',
        downBoxClass:'down-box',
        companyClass:'company',
        domainClass:'domain',
          invoiceClass:"invoice-no",
          questionClass:"question",
          questionDetailClass:"question-details",
          dateClass:"date",
signClass:"sign-logo",
signatureClass:"signature",
        
    };

    // Default data
    defaultData = {
        
        logo: './logo.jpg',
        logoAlt: "Your Company Logo",
        sign:"./sign-logo.jpg",
        party: {
            name: 'abcd',
            mobile: '+917517978898',
            email: 'kapansiteuser@gmail.com',
            address: {
                location: "Kalewadi",
                area: "Pune City",
                city: "Pune",
                state: "MAHARASHTRA",
                country: "India",
                pincode: "411017"
            }
        },
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
       
        invoiceNumber: 'IN00000659',
        invoiceDate: 'Sep 4, 2024',
        items: [
            { 
                no: " 1", 
                descriptionOfServices:"Logo Design",
                quantity:"1 project",
                ratePerHour:"$500.00",
                total:"$500.00"

            },
            { 
                no: " 2", 
                descriptionOfServices:"Brochure Design",
                quantity:"1 project",
                ratePerHour:"$500.00",
                total:"$500.00"
            },
            { 
                no: "3", 
                descriptionOfServices:"Website Redesign",
                quantity:"1 project",
                ratePerHour:"$500.00",
                total:"$500.00"
                
            },
            {
                no: "4", 
                descriptionOfServices:"Social Media Graphics",
                quantity:"1 project",
                ratePerHour:"$500.00",
                total:"$500.00"
            }
        ],
        company: {
            name: 'Kalpesh Shewale',
            mobile: '+918669368242',
            email: 'kshewale2001@gmail.com',
            address: {
                city: "Adilabad",
                state: "ANDHRA PRADESH",
                country: "India",
                pincode: "504306"
            }
        },
        subTotal: 570.00,
        discount: 30.00,
        taxableAmount: 570.00,
        sgstTotal: 16.20,
        cgstTotal: 16.20,
        igstTotal: 0.00,
        amount: 642.00,
        totalAmount: 642.00,
        amountInWords: 'Six Hundred Forty Two',
        bankDetails: {
            paymentMethod:"Bank Transfer",
                   dueDate:"October 15,2030",
                   bankAccount:"1234-5678-9012"
        },
        terms: [
            "Payment is due upon receipt of this invoice.",
                    "Late payments may incur additional charges.",
        ]
    };

    constructor() {
        super();
        this.config = this.defaultConfig;
       // this.data = this.defaultData;

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Load external CSS file
        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './style.css'); // Adjust the path if necessary
        shadow.appendChild(linkElement);

        // Create container for the invoice
        this.container = document.createElement('div');
        shadow.appendChild(this.container);
    }

    static get observedAttributes() {
        return ["config", "data"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            try {
                const parsedValue = JSON.parse(newValue);
                if (name === 'config') {
                    this.config = { ...this.defaultConfig, ...parsedValue };
                }
                if (name === 'data') {
                    this.data = { ...this.defaultData, ...parsedValue };
                }
                this.render();  // Re-render on update
            } catch (e) {
                console.error(`Invalid JSON in ${name}:`, e);
            }
        }
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.container.innerHTML = ''; // Clear previous content
    
        // Use the provided config and data, otherwise fall back to defaults
        const config = this.config;
        const data = this.data;
    
        // Check if party data is defined
        const seller = data.party || {};
        const client = data.company || {};
    
        // Apply the container class
        this.container.classList.add(config.containerClass);
    
        // Header
        const header = document.createElement('div');
        header.classList.add(config.headerClass);

        const logo = document.createElement('img');
        logo.src = data.logo || this.defaultData.logo;
        logo.alt = data.logoAlt || 'Company Logo';
        logo.classList.add(config.logoClass);
        this.container.appendChild(logo);
        
        const sign = document.createElement('img');
        sign.src = data.sign || this.defaultData.sign;
        sign.alt = data.signAlt || 'Signature';
        sign.classList.add(config.signClass);
        this.container.appendChild(sign);
    
        const title = document.createElement('h1');
        title.textContent = 'INVOICE';
        title.classList.add(config.titleClass);
        this.container.appendChild(title);

        const company = document.createElement('h2');
        company.textContent = 'Design';
        company.classList.add(config.companyClass);
        this.container.appendChild(company);

        const domain = document.createElement('h2');
        domain.textContent = 'Studio';
        domain.classList.add(config.domainClass);
        this.container.appendChild(domain);


    
        const line = document.createElement('div');
        line.classList.add(config.lineClass);
        this.container.appendChild(line);

        const underLine = document.createElement('div');
        underLine.classList.add(config.underlineClass);
        this.container.appendChild(underLine);

        const upperLine = document.createElement('div');
        upperLine.classList.add(config.upperLineClass);
        this.container.appendChild(upperLine);

        const downLine = document.createElement('div');
        downLine.classList.add(config.downLineClass);
        this.container.appendChild(downLine);

        const upperBox = document.createElement('div');
        upperBox.classList.add(config.upperBoxClass);
        this.container.appendChild(upperBox);

        const downBox = document.createElement('div');
        downBox.classList.add(config.downBoxClass);
        this.container.appendChild(downBox);
    
        const service = document.createElement('h2');
        service.textContent = 'Service Details:';
        service.classList.add(config.serviceClass);
        this.container.appendChild(service);

        // Invoice details
        const details = document.createElement('div');
        details.classList.add(config.detailsClass);
        this.container.appendChild(details);
    
        // Seller information
        const sellerInfo = this.createInfoSection('Billing Address:', seller);
        this.container.appendChild(sellerInfo);

        const clientInfo = this.createInfoSection('Shipping Address:', client);
        clientInfo.classList.add(config.clientInfoClass);
        this.container.appendChild(clientInfo);

    
        const invDetails = document.createElement('div');
        invDetails.innerHTML =`<strong> ${this.data.invoiceNumber}</strong><br>
                                <strong> ${this.data.invoiceDate} </strong>`;
        invDetails.classList.add(config.invoiceClass);
        this.container.appendChild(invDetails);

        //question

        const question = document.createElement('h2');
        question.textContent = 'Questions';
        question.classList.add(config.questionClass);
        this.container.appendChild(question);

        const questionDetails = document.createElement('div');
        questionDetails.innerHTML =`<strong>Email Us: </strong> ${this.data.email}<br>
        <strong>Call Us: </strong> ${this.data.no}`;
        questionDetails.classList.add(config.questionDetailClass);
        this.container.appendChild(questionDetails);

        //date
        const date = document.createElement('div');
        date.innerHTML=`${this.data.date}`;
        date.classList.add(config.dateClass);
        this.container.appendChild(date);
        





        //signature
        const signature = document.createElement('div');
        signature.innerHTML=`${this.data.signature}`;
        signature.classList.add(config.signatureClass);
        this.container.appendChild(signature);
        
        
        // Invoice items
        const items = document.createElement('div');
        items.classList.add(config.itemsClass);
        this.container.appendChild(items);
    
        const table = document.createElement('table');
        table.classList.add(config.tableClass);
        this.container.appendChild(table);
    
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.appendChild(this.createTableHeaderCell('#'));
    
         // Collect all unique keys from the items to create headers
    const allKeys = new Set();

    data.items.forEach(item => {
        Object.keys(item).forEach(key => {
            allKeys.add(key);
        });
    });

    allKeys.forEach(key => {
        if (key !== 'name') {
            headerRow.appendChild(this.createTableHeaderCell(key.charAt(0).toUpperCase() + key.slice(1)));
        }
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.items.forEach(item => {
        const row = document.createElement('tr');
        row.appendChild(this.createTableCell(item.name));

        // Create cells based on the collected keys
        allKeys.forEach(key => {
            if (key !== 'name') {
                row.appendChild(this.createTableCell(item[key] !== undefined ? item[key] : ''));
            }
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    items.appendChild(table);
    this.container.appendChild(items);
    
        // Total section
        const totalSection = document.createElement('div');
        totalSection.classList.add(config.totalSectionClass);
    
        const totalItems = [
            { label: 'Subtotal:', value: data.subTotal !== undefined ? `$${data.subTotal.toFixed(2)}` : '$0.00' },
           
            { label: 'Taxable Amount:', value: data.taxableAmount !== undefined ? `$${data.taxableAmount.toFixed(2)}` : '$0.00' },
           
            { label: 'Total Amount:', value: data.totalAmount !== undefined ? `$${data.totalAmount.toFixed(2)}` : '$0.00' }
        ];
    
        totalItems.forEach(item => {
            const totalRow = document.createElement('div');
            totalRow.innerHTML = `<strong>${item.label}</strong> ${item.value}`;
            totalSection.appendChild(totalRow);
        });
    
        this.container.appendChild(totalSection);
    
       
       // Conditionally render bank details
       if (config.showBankDetails && data.bankDetails) {
        const bankDetails = document.createElement('div');
        bankDetails.classList.add(config.bankDetailsClass); // Use footerClass for styling
    
        const bankTitle = document.createElement('h3');
        bankTitle.textContent = 'Payment Information';
        bankDetails.appendChild(bankTitle);
    
        const bankInfo = document.createElement('div');
        bankInfo.innerHTML = `<strong>Payment Method:</strong> ${data.bankDetails.paymentMethod} <br>
         <strong>Due Date:</strong> ${data.bankDetails.dueDate}<br> <strong>Bank Account:</strong> ${data.bankDetails.bankAccount}`;
        bankDetails.appendChild(bankInfo);
    
        this.container.appendChild(bankDetails);
    }
    
        // Terms and conditions
        if (config.showTerms && data.terms && data.terms.length) {
            const termsSection = document.createElement('div');
            termsSection.classList.add('terms-section');
            termsSection.innerHTML = `<h3>Terms and Conditions:</h3>`;
            data.terms.forEach(term => {
                const termItem = document.createElement('li');
                termItem.textContent = term;
                termsSection.appendChild(termItem);
            });
            this.container.appendChild(termsSection);
        }
    
        
    }
    
    createInfoSection(title, info) {
        const section = document.createElement('div');
        section.classList.add(this.config.sellerInfoClass);
        const titleElem = document.createElement('h2');
        titleElem.textContent = title;
        section.appendChild(titleElem);

        const infoDetails = document.createElement('p');
        infoDetails.innerHTML = `
            <strong>Name:</strong> ${info.name || ''}<br>
            <strong>Mobile:</strong> ${info.mobile || ''}<br>
            <strong>Email:</strong> ${info.email || ''}<br>
            <strong>Address:</strong> ${info.address?.location || ''}, ${info.address?.city || ''}, ${info.address?.state || ''}, ${info.address?.pincode || ''}, ${info.address?.country || ''}
        `;
        section.appendChild(infoDetails);
        return section;
    }
    

    createTableHeaderCell(content) {
        const cell = document.createElement('th');
        cell.textContent = content;
        return cell;
    }

    createTableCell(content) {
        const cell = document.createElement('td');
        cell.textContent = content;
        return cell;
    }
}

// Define the custom element
customElements.define('invoice-component', InvoiceComponent);
