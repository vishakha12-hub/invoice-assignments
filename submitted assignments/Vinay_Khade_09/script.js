class InvoiceComponent extends HTMLElement {
    // Default configuration with class names for various elements
    defaultConfig = {
        containerClass: 'invoice-container',
        headerClass: 'invoice-header',
        logoClass: 'invoice-logo',
        titleClass: 'invoice-title',
        detailsClass: 'invoice-details',
        sellerInfoClass: 'seller-info',
        clientInfoClass: 'client-info',
        itemsClass: 'invoice-items',
        tableClass: 'invoice-table',
        totalSectionClass: 'total-section',
        footerClass: 'invoice-footer',
        amountInWordsClass: 'amount-in-words',
        footerTextClass: 'invoice-footer-text',
        showBankDetails: true, 
        showTerms: true,
    };

    // Default data
    defaultData = {
        logo:'./background.jpg',
        logoAlt: "My Company ",
        party: {
            name: 'Localhost',
            mobile: '+916739498898',
            email: 'apansiteuser@gmail.com',
            address: {
                location: "Marunji",
                area: "Pune City",
                city: "Pune",
                state: "MAHARASHTRA",
                country: "India",
                pincode: "411057"
            }
        },
        company: {
            name: 'Vinay Khade ',
            mobile: '+919511803453',
            email: 'vk2003@gmail.com',
            address: {
                city: "Satara",
                state: "Maharashtra",
                country: "India",
                pincode: "415506"
            }
        },
        invoiceNumber: 'IN00000234',
        invoiceDate: 'jan 4, 2025',
        items: [
            { name: 'Tax Demo', price: 100.00, quantity: 3, subTotal: 270.00, discount: 30.00, cgst: 16.20, igst: 0.00, },
            { name: 'Frame Demo', price: 50.00, quantity: 6, subTotal: 300.00, discount: 0.00, sgst: 0.00, cgst: 0.00, igst: 0.00, },
            { name: 'Frame Demo', price: 50.00, quantity: 6, subTotal: 300.00, discount: 0.00, sgst: 0.00, cgst: 0.00, igst: 0.00,  }
        ],
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
            bank: " BANK OF INDIA",
            account: "667899999345445",
            ifsc: "BBIK0001519",
            branch: "Vaduj",
        },
        terms: [
            "Goods once sold cannot be taken back or exchanged.",
            "We are not the manufacturers; the company will stand for warranty as per their terms and conditions.",
        ]
    };

    constructor() {
        super();
        this.config = this.defaultConfig;
        this.data = this.defaultData;

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Load external CSS file
        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', 'style.css'); // Adjust the path if necessary
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
            if (name === 'config' && newValue) {
                try {
                    const customConfig = JSON.parse(newValue);
                    this.config = { ...this.defaultConfig, ...customConfig };  // Merge the default config with the custom config
                } catch (e) {
                    console.error('Invalid config JSON:', e);
                }
            }
            if (name === 'data' && newValue) {
                try {
                    this.data = JSON.parse(newValue);
                } catch (e) {
                    console.error('Invalid data JSON:', e);
                }
            }
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.container.innerHTML = ''; // Clear previous content
    
        // Use the provided config and data, otherwise fall back to defaults
        const config = this.config || this.defaultConfig;
        const data = this.data || this.defaultData;
    
        // Check if party data is defined
        const seller = data.party || {};
        const client = data.company || {};
    
        // Apply the container class
        this.container.classList.add(config.containerClass);
    
        // Header
        const header = document.createElement('div');
        header.classList.add(config.headerClass);
    
        const logo = document.createElement('img');
        logo.src = data.logo || this.defaultData.logo; // Fallback to default logo
        logo.alt = data.logoAlt || 'Company Logo';
        logo.classList.add(config.logoClass);
        header.appendChild(logo);
    
        const title = document.createElement('h1');
        title.textContent = 'Invoice';
        title.classList.add(config.titleClass);
        header.appendChild(title);
    
        this.container.appendChild(header);
    
        // Invoice details
        const details = document.createElement('div');
        details.classList.add(config.detailsClass);
        
        // Seller information
        const sellerInfo = this.createInfoSection('Seller', seller);
        details.appendChild(sellerInfo);
    
        // Client information
        const clientInfo = this.createInfoSection('Client', client);
        details.appendChild(clientInfo);
    
        this.container.appendChild(details);
    
        // Invoice items
        const items = document.createElement('div');
        items.classList.add(config.itemsClass);
    
        const table = document.createElement('table');
        table.classList.add(config.tableClass);
    
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.appendChild(this.createTableHeaderCell('Product'));
    
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
            { label: 'Discount:', value: data.discount !== undefined ? `$${data.discount.toFixed(2)}` : '$0.00' },
            { label: 'Taxable Amount:', value: data.taxableAmount !== undefined ? `$${data.taxableAmount.toFixed(2)}` : '$0.00' },
            // { label: 'SGST Total:', value: data.sgstTotal !== undefined ? `$${data.sgstTotal.toFixed(2)}` : '$0.00' },
            // { label: 'CGST Total:', value: data.cgstTotal !== undefined ? `$${data.cgstTotal.toFixed(2)}` : '$0.00' },
            // { label: 'IGST Total:', value: data.igstTotal !== undefined ? `$${data.igstTotal.toFixed(2)}` : '$0.00' },
            { label: 'Amount:', value: data.amount !== undefined ? `$${data.amount.toFixed(2)}` : '$0.00' },
            { label: 'Total Amount:', value: data.totalAmount !== undefined ? `$${data.totalAmount.toFixed(2)}` : '$0.00' }
        ];
    
        totalItems.forEach(item => {
            const totalRow = document.createElement('div');
            totalRow.innerHTML = `<strong>${item.label}</strong> ${item.value}`;
            totalSection.appendChild(totalRow);
        });
         
        this.container.appendChild(totalSection);
    
        // Amount in words
        const amountInWords = document.createElement('div');
        amountInWords.classList.add(config.amountInWordsClass);
        amountInWords.textContent = `Amount in words: ${data.amountInWords || 'N/A'}`;
        this.container.appendChild(amountInWords);
    
       // Conditionally render bank details
       if (config.showBankDetails && data.bankDetails) {
        const bankDetails = document.createElement('div');
        bankDetails.classList.add(config.footerClass); // Use footerClass for styling
    
        const bankTitle = document.createElement('h3');
        bankTitle.textContent = 'Bank Details';
        bankDetails.appendChild(bankTitle);
    
        const bankInfo = document.createElement('p');
        bankInfo.textContent = `Bank: ${data.bankDetails.bank}; Account: ${data.bankDetails.account}; IFSC: ${data.bankDetails.ifsc}; Branch: ${data.bankDetails.branch}`;
        bankDetails.appendChild(bankInfo);
    
        this.container.appendChild(bankDetails);
    }
    
        // Terms and conditions
        if (config.showTerms && data.terms && data.terms.length) {
            const termsSection = document.createElement('div');
            termsSection.classList.add('terms-section');
            termsSection.innerHTML = `<strong>Terms and Conditions:</strong>`;
            data.terms.forEach(term => {
                const termItem = document.createElement('div');
                termItem.textContent = term;
                termsSection.appendChild(termItem);
            });
            this.container.appendChild(termsSection);
        }
    
        // Footer
        const footer = document.createElement('div');
        footer.classList.add(config.footerClass);
        footer.innerHTML = `<p class="${config.footerTextClass}">Thank you for your business!</p>`;
        this.container.appendChild(footer);
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
