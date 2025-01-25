class InvoiceFormComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const bootstrapLink = document.createElement('link');
    bootstrapLink.setAttribute('rel', 'stylesheet');
    bootstrapLink.setAttribute(
      'href',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
    );
    this.shadowRoot.appendChild(bootstrapLink);
    this.defaultFields = [
      {
        type: 'date',
        label: 'Date',
        name: 'config.date',
        colClass: 'col-md-3',
      },
      {
        type: 'text',
        label: 'Vno',
        name: 'config.vno',
        placeholder: 'Enter VNo',
        colClass: 'col-md-3',
        defaultValue:0
      },
      {
        type: 'text',
        label: 'Invoice Number',
        name: 'config.invoiceNumber',
        placeholder: 'Enter invoice number',
        colClass: 'col-md-3',
      },
      {
        type: 'date',
        label: 'Invoice Date',
        name: 'config.invoiceDate',
        colClass: 'col-md-3',
        required:true
      },
      {
        type: 'autocomplete',
        label: 'Search Company',
        name: 'companyId',
        dataModel: 'companies',
        defaultValue:0,
        dataParams: { limit: 10 },
        value: 'id',
        display: ['name'],
        colClass: 'col-md-6',
      },
      {
        type: 'autocomplete',
        label: 'Godown',
        name: 'config.storageLocationId',
        dataModel: 'inventory-storage-locations', 
        dataParams: { limit: 10 },
        value: 'id',
        display: ['name'],
        colClass: 'col-md-6',
      },
      {
        type: 'autocomplete',
        label: 'Supplier',
        name: 'partyId',
        dataModel: 'accounting-parties',
        dataParams: { limit: 10 },
        value: 'id',
        display: ['name'],
        colClass: 'col-md-6',
        required:true
      },
      {
        type: 'text',
        label: 'Narration',
        name: 'remark',
        placeholder: 'Enter narration',
        colClass: 'col-md-6',
      },
      { 
        name: 'igst', 
        label: 'GST/IGST', 
        type: 'select', 
        colClass: 'col-md-6',
        options: [
          { value: 'gst', label: 'Yes' },
          { value: 'igst', label: 'No' }
        ] 
      },
      { 
        name: 'lbt', 
        label: 'For LBT', 
        type: 'select', 
        colClass: 'col-md-3',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ] 
      },
      {
        type: 'autocomplete',
        label: 'PO',
        name: 'orderId',
        dataModel: 'accounting-orders',
        dataParams: { limit: 10 },
        value: 'id',
        display: ['uid'],
        colClass: 'col-md-3',
        required:true
      },
      {
        layout: 'table',
        name: 'particulars',
        label: 'Products',
        columns: [
          { name: 'srno', label: 'Sr No', type: 'autoIncrease' ,required:true},
          { name: 'uid', 
            label: 'Item Code',  
            type: 'autocomplete', 
            dataModel: 'inventory-products/search', 
            dataParams: { limit: 10 },
            value: 'uid',
            display: ['uid','name'],
            appliedTo:'pr1'
          },
          { name: 'name', 
            label: 'Item Name',  
            type: 'autocomplete', 
            dataModel: 'inventory-products/search', 
            dataParams: { limit: 10 },
            value: 'id',
            display:  ['uid','name'],
            appliedTo:'pr2'
          },
          //{ name: 'id', label: 'Id', type: 'hidden'},
          { 
            name: 'unit', 
            label: 'Units', 
            type: 'select', 
            options: [
              { value: 'PCS', label: 'PCS' },
              { value: 'Box', label: 'Box' }
            ] 
          },          
          { name: 'quantity', label: 'QTY', type: 'number',defaultValue:1  },
          { name: 'free', label: 'Free', type: 'number',defaultValue:0  },
          { name: 'mrp', label: 'Rate', type: 'number' ,defaultValue:0 },
          { name: 'grossAmt', label: 'Gross Amt', type: 'number',defaultValue:0  },
          { name: 'Disc1', label: 'Disc1', type: 'number',defaultValue:0  },
          { name: 'Disc2', label: 'Disc2', type: 'number',defaultValue:0  },
          { name: 'Disc3', label: 'Disc3', type: 'number' ,defaultValue:0 },
          { name: 'Disc4', label: 'Disc4', type: 'number' ,defaultValue:0 },
          { name: 'taxable', label: 'Taxable', type: 'number' ,defaultValue:0 },
          { name: 'gst', label: 'GST', type: 'number' ,defaultValue:0 },
          { name: 'cgst', label: 'CGST', type: 'number' ,defaultValue:0 },
          { name: 'sgst', label: 'SGST', type: 'number' ,defaultValue:0 },
          { name: 'igst', label: 'IGST', type: 'number' ,defaultValue:0 },
          { name: 'cess', label: 'Cess', type: 'number' ,defaultValue:0 },
          { name: 'cessAmt', label: 'CessAMT', type: 'number' ,defaultValue:0 },
          { name: 'cessPCS', label: 'Cess/PCS', type: 'number' ,defaultValue:0 },
          { name: 'gstAmt', label: 'GSTAMT', type: 'number' ,defaultValue:0 },
          { name: 'wt', label: 'WT', type: 'number' ,defaultValue:0 },
        ],
      },
    ];
    this.particulars = [];
  }

  connectedCallback() {
    const dataFields = this.getAttribute('data-fields')
      ? JSON.parse(this.getAttribute('data-fields'))
      : this.defaultFields;
    this.renderForm(dataFields);
  }

  renderForm(fields) {
    const form = document.createElement('form');
    form.classList.add('p-4', 'bg-light', 'rounded');

    const rowWrapper = document.createElement('div');
    rowWrapper.classList.add('row');

    fields.forEach((field) => {
      if (field.layout === 'table') {
        this.renderTableField(rowWrapper,form, field);
      } else {
        this.renderField(rowWrapper, field);
      }
    });

    form.appendChild(rowWrapper);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';
    submitButton.classList.add('btn', 'btn-primary', 'mt-3');
    form.appendChild(submitButton);

    this.shadowRoot.appendChild(form);

    form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  renderField(rowWrapper, field) {
    const colWrapper = document.createElement('div');
    colWrapper.className = field.colClass || 'col-12';

    if (field.type === 'autocomplete') {
      this.createAutocompleteField(colWrapper, field);
    } else {
      const wrapper = document.createElement('div');
      wrapper.classList.add('mb-3');
      const label = document.createElement('label');
      label.setAttribute('for', field.name);
      label.textContent =field.required ? `${field.label} *` : field.label;
      label.classList.add('form-label');
      let input;
      if(field.type=='select'){
        input = document.createElement('select');
        input.setAttribute('name', field.name);
        input.classList.add('form-control');
        field.options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option.value;
          optionElement.textContent = option.label;
          input.appendChild(optionElement);
        });
      }else{
        input = document.createElement('input');
        input.setAttribute('type', field.type);
        input.setAttribute('name', field.name);
        input.setAttribute('placeholder', field.placeholder);
        input.classList.add('form-control');
      }
      if (field.required) {
        input.setAttribute('required', true);
      }
      if (field.disabled) {
        input.setAttribute('disabled', true);
      }
      if (field.defaultValue || field.defaultValue===0) {
        input.setAttribute('value', field.defaultValue);
      }
      if (field.placeholder) {
        input.setAttribute('placeholder', field.placeholder);
      }
      if (field.maxlength) {
        input.setAttribute('maxlength', field.maxlength);
      }
      if (field.minlength) {
        input.setAttribute('minlength', field.minlength);
      }
      if (field.pattern) {
        input.setAttribute('pattern', field.pattern);
      }
      if (field.size) {
        input.setAttribute('size', field.size);
      }

      wrapper.appendChild(label);
      wrapper.appendChild(input);
      colWrapper.appendChild(wrapper);
    }

    rowWrapper.appendChild(colWrapper);
  }

  renderTableField(rowWrapper, form, field) {
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('mb-3');

    const style = document.createElement('style');
    style.textContent = `
      table.table td {
        padding: 0 !important;
      }
      table.table td input {
        //margin: 0;
      }
      td .form-control {
      padding: 1px !important;
      border-radius: 0 !important;
      }
    `;
    this.shadowRoot.appendChild(style);
    const label = document.createElement('label');
    label.textContent = field.required ? `${field.label} *` : field.label;

    label.classList.add('form-label');
    tableWrapper.appendChild(label);

    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    field.columns.forEach((col) => {
      const th = document.createElement('th');
      th.textContent = col.required ? `${col.label} *` : col.label;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrapper.appendChild(table);

    const addRowButton = document.createElement('button');
    addRowButton.textContent = 'Add Product';
    addRowButton.classList.add('btn', 'btn-secondary', 'mt-2');
    addRowButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.addNewProductRow(field, tbody);
    });
    tableWrapper.appendChild(addRowButton);

    // Add the additional fields below the table
    const totalsWrapper = document.createElement('div');
    totalsWrapper.classList.add('row');
    totalsWrapper.classList.add('mt-3');

    const fields = [
      { name: 'subTotal', label: 'Sub Total' ,colClass:'col-3'},
      { name: 'discount', label: 'Discount' ,colClass:'col-3'},
      { name: 'discountedSubTotal', label: 'Discounted Sub Total' ,colClass:'col-3'},
      { name: 'taxTotal', label: 'Tax Total' ,colClass:'col-3'},
      { name: 'mrpTotal', label: 'MRP Total' ,colClass:'col-3'},
      { name: 'amount', label: 'Amount' ,colClass:'col-3'},
      { name: 'roundOff', label: 'Round Off' ,colClass:'col-3'},
      { name: 'subTotalAmount', label: 'Sub Total Amount',colClass:'col-3' },
    ];

    fields.forEach((field) => {
      const fieldWrapper = document.createElement('div');
      fieldWrapper.className = field.colClass || 'col-12';
      fieldWrapper.classList.add('mb-2');

      const label = document.createElement('label');
      label.textContent = field.label;
      label.classList.add('form-label');

      const input = document.createElement('input');
      input.setAttribute('type', 'number');
      input.setAttribute('name', field.name);
      input.classList.add('form-control');
      input.setAttribute('readonly', true);

      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(input);
      totalsWrapper.appendChild(fieldWrapper);
    });

    tableWrapper.appendChild(totalsWrapper);
    rowWrapper.appendChild(tableWrapper);
  }

  addNewProductRow( field, tbody) {
    if (!Array.isArray(this.particulars)) {
      console.error('Table data is not an array');
      return;
    }
    const newRow = {};
    field.columns.forEach((col) => {
      newRow[col.name] = col.default || ''; 
    });
    this.particulars.push(newRow);
    const rowIndex = this.particulars.length - 1; 
    const rowElement = document.createElement('tr');
    field.columns.forEach((col) => {
      const cell = document.createElement('td');
      if (col.type === 'autocomplete') {
        this.createAutocompleteFieldInTable(cell, 'particulars', rowIndex, col, newRow, field, tbody);
      } else {
        const input = document.createElement('input');
        input.type = col.type;
        input.name = `particulars[${rowIndex}][${col.name}]`;
        if(col.type==='select'){
          input.options=col.options
        }
        input.value = col.type === 'autoIncrease' ? rowIndex + 1 : newRow[col.name] || '';
        input.classList.add('form-control');
        if (col.type === 'autoIncrease') {
          input.setAttribute('disabled', true);
        }
        if (col.required) {
          input.setAttribute('required', true);
        }
        if (col.disabled) {
          input.setAttribute('disabled', true);
        } 
        if (col.defaultValue || col.defaultValue===0) {
          input.value = col.defaultValue 
        }
        if (col.placeholder) {
          input.setAttribute('placeholder', field.placeholder);
        }
        if (col.maxlength) {
          input.setAttribute('maxlength', field.maxlength);
        }
        if (col.minlength) {
          input.setAttribute('minlength', field.minlength);
        }
        if (col.pattern) {
          input.setAttribute('pattern', field.pattern);
        }
        if (col.size) {
          input.setAttribute('size', field.size);
        }
        input.addEventListener('input', (e) => {
          newRow[col.name] = e.target.value;
        });
        if (col.name === 'quantity' || col.name === 'mrp') {
          input.addEventListener('input', (e) => {
            newRow[col.name] = parseFloat(e.target.value) || 0;
            this.updateGrossAmt(rowIndex, field.columns, tbody);
          });
        } else {
          input.addEventListener('input', (e) => {
            newRow[col.name] = e.target.value;
          });
        }
        cell.appendChild(input);
      }
      rowElement.appendChild(cell);
    });
  
    // Append the row to the table body
    tbody.appendChild(rowElement);
  }
  


  renderTableRows(field, tbody) {
    tbody.innerHTML = ''; 
    
    this.particulars.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      field.columns.forEach((col) => {
        const td = document.createElement('td');
        if (col.type === 'autocomplete') {
          this.createAutocompleteFieldInTable(td, field.name, rowIndex, col, row,field,tbody);
        } else {
          const input = document.createElement('input');
          input.setAttribute('type', col.type === 'autoIncrease' ? 'text' : col.type);
          input.setAttribute('name', `${field.name}[${rowIndex}][${col.name}]`);
          input.value = col.type === 'autoIncrease' ? rowIndex + 1 : row[col.name] || '';
          input.classList.add('form-control');
          if (col.type === 'autoIncrease') {
            input.setAttribute('disabled', true);
          }
          if (col.required) {
            input.setAttribute('required', true);
          }
          if (col.disabled) {
            input.setAttribute('disabled', true);
          } 
          if (col.defaultValue || col.defaultValue===0) {
            input.value = col.defaultValue 
          }
          if (col.placeholder) {
            input.setAttribute('placeholder', field.placeholder);
          }
          if (col.maxlength) {
            input.setAttribute('maxlength', field.maxlength);
          }
          if (col.minlength) {
            input.setAttribute('minlength', field.minlength);
          }
          if (col.pattern) {
            input.setAttribute('pattern', field.pattern);
          }
          if (col.size) {
            input.setAttribute('size', field.size);
          }
          input.addEventListener('input', (e) => {
            row[col.name] = e.target.value;
          });
          if (col.name === 'quantity' || col.name === 'mrp') {
            input.addEventListener('input', (e) => {
              row[col.name] = parseFloat(e.target.value) || 0;
              this.updateGrossAmt(rowIndex, field.columns, tbody);
            });
          } else {
            input.addEventListener('input', (e) => {
              row[col.name] = e.target.value;
            });
          }
          td.appendChild(input);
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }
  updateTotals() {
    const subTotal = this.particulars.reduce((sum, row) => sum + (parseFloat(row['grossAmt']) || 0), 0);
    const discount = this.particulars.reduce((sum, row) => sum + (parseFloat(row['discount']) || 0), 0);
    const couponDiscount = 0; // Assuming no coupon discount for now
    const discountedSubTotal = subTotal - discount - couponDiscount;
    const taxTotal = this.particulars.reduce((sum, row) => sum + (parseFloat(row['gst']) || 0), 0);
    const mrpTotal = this.particulars.reduce((sum, row) => sum + (parseFloat(row['mrp']) || 0), 0);
    const previousDue = 0; 
    const amount = discountedSubTotal + taxTotal;
    const roundOff = Math.round(amount) - amount;
    const subTotalAmount = amount + roundOff;

    this.shadowRoot.querySelector('input[name="subTotal"]').value = subTotal.toFixed(2);
    this.shadowRoot.querySelector('input[name="discount"]').value = discount.toFixed(2);
    this.shadowRoot.querySelector('input[name="discountedSubTotal"]').value = discountedSubTotal.toFixed(2);
    this.shadowRoot.querySelector('input[name="taxTotal"]').value = taxTotal.toFixed(2);
    this.shadowRoot.querySelector('input[name="mrpTotal"]').value = mrpTotal.toFixed(2);
    this.shadowRoot.querySelector('input[name="amount"]').value = amount.toFixed(2);
    this.shadowRoot.querySelector('input[name="roundOff"]').value = roundOff.toFixed(2);
    this.shadowRoot.querySelector('input[name="subTotalAmount"]').value = subTotalAmount.toFixed(2);
  }
  updateGrossAmt(rowIndex, columns, tbody) {
    console.log('updateGrossAmt called')
    const row = this.particulars[rowIndex];

    const quantity = parseFloat(row['quantity']) || 0;
    const mrp = parseFloat(row['mrp']) || 0;
    const gst = parseFloat(row['gst']) || 0;
    const discount = parseFloat(row['discount']) || 0;
    row['grossAmt'] = quantity * mrp;
    this.updateTotal(rowIndex);

    const grossAmtColIndex = columns.findIndex((col) => col.name === 'grossAmt');
    if (grossAmtColIndex !== -1) {
      const tr = tbody.children[rowIndex];
      const td = tr.children[grossAmtColIndex];
      td.innerHTML = ''; // Clear existing content

      const input = document.createElement('input');
      input.setAttribute('type', 'number');
      input.setAttribute('name', `particulars[${rowIndex}][grossAmt]`);
      input.value = row['grossAmt'].toFixed(2); // Show as 2 decimal places
      input.classList.add('form-control');
      input.setAttribute('disabled', true); // Make it read-only
      td.appendChild(input);
    }

    // Update the additional fields
    this.updateTotals();
  }
  updateRowField(rowIndex, fieldName, value, field, tbody) {
    const columnIndex = field.columns.findIndex((col) => col.map === fieldName || col.name === fieldName);
    if (columnIndex !== -1) {
      const tr = tbody.children[rowIndex];
      const td = tr.children[columnIndex];
      const input = td.querySelector('input');
      if (input) {
        input.value = value;
      }
    }
  }
  updateTotal(rowIndex) {
    const row = this.particulars[rowIndex];
    console.log(row)
    const quantity = row.quantity || 0;
    const mrp = row.mrp || 0.0;
    row.total = quantity * mrp;
    
    console.log("Updated Total for Row", rowIndex, ":", row.total);
    const grandTotal = this.particulars.reduce((sum, row) => {
      const total = row.total || 0;
      return sum + total;
    }, 0);
  }
  
  createAutocompleteFieldInTable(cell, tableName, rowIndex, col, row, field, tbody) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('position-relative');
  
    const inputElement = document.createElement('input');
    const fieldId = `${tableName}[${rowIndex}][${col.name}]`;
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('name', fieldId);
    inputElement.setAttribute('data-field-id', fieldId);
    inputElement.value = row[col.name] || '';
    inputElement.classList.add('form-control');
    wrapper.appendChild(inputElement);
  
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.classList.add(
      'list-group',
      'position-absolute',
      'w-100',
      'mt-1',
      'z-index-100',
      'bg-white'
    );
    suggestionsContainer.setAttribute('data-field-id', fieldId);
    wrapper.appendChild(suggestionsContainer);
  
    let activeIndex = -1;
  
    inputElement.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      activeIndex = -1;
      const orClause = col.display.map((key) => ({
        [key]: { like: searchTerm },
      }));
  
      const customEvent = new CustomEvent('requestData', {
        bubbles: true,
        cancelable: true,
        detail: {
          data: {
            appliedTo: col.appliedTo,
            dataModel: col.dataModel,
            dataParams: JSON.stringify({
              ...col.dataParams,
              where: { or: orClause },
            }),
            fieldId,
          },
        },
      });
      this.dispatchEvent(customEvent);
    });
  
    const responseHandler = (event) => {
      const { appliedTo, dataModel, res, fieldId: responseFieldId } = event.detail;
      if (col.appliedTo && appliedTo !== col.appliedTo) return;
      if (dataModel !== col.dataModel) return;
      if (responseFieldId !== fieldId) return;
  
      suggestionsContainer.innerHTML = '';
      if (Array.isArray(res) && res.length > 0) {
        res.forEach((item, index) => {
          const suggestionItem = document.createElement('a');
          suggestionItem.className = 'list-group-item list-group-item-action';
          const displayText = col.display.map((key) => item[key]).join(' - ');
          suggestionItem.textContent = displayText;
          suggestionItem.setAttribute('data-id', item[col.value]);
          suggestionItem.addEventListener('click', () => {
            inputElement.value = displayText;
            inputElement.setAttribute('data-id', item[col.value]);
            row[col.name] = displayText;
            suggestionsContainer.innerHTML = '';
            console.log('fieldfield',field)
            field.columns.forEach((rowField) => {
              if (rowField.name in item) {
                row[rowField.name] = item[rowField.name];
                this.updateRowField(rowIndex, rowField.name, item[rowField.name], field, tbody);
              }
            });
          });
          suggestionsContainer.appendChild(suggestionItem);
        });
      } else {
        const noResult = document.createElement('div');
        noResult.className = 'list-group-item text-muted';
        noResult.textContent = 'No results found';
        suggestionsContainer.appendChild(noResult);
      }
    };
  
    inputElement.addEventListener('keydown', (e) => {
      const items = suggestionsContainer.querySelectorAll('.list-group-item');
      if (items.length === 0) return;
  
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (activeIndex >= 0) {
          const selectedItem = items[activeIndex];
          inputElement.value = selectedItem.textContent;
          inputElement.setAttribute('data-id', selectedItem.getAttribute('data-id'));
          row[col.name] = selectedItem.textContent;
          suggestionsContainer.innerHTML = '';
        }
      }
  
      items.forEach((item, index) => {
        item.classList.toggle('active', index === activeIndex);
      });
    });
  
    this.addEventListener('responseData', responseHandler);
  
    cell.appendChild(wrapper);
  }

  createAutocompleteField(form, field) {
    const wrapper = document.createElement('div');
    wrapper.classList.add( 'position-relative');
  
    const label = document.createElement('label');
    label.setAttribute('for', field.name);
    label.textContent = field.required ? `${field.label} *` : field.label;
    label.classList.add('form-label');
  
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('name', field.name);
    if (field.required) {
      inputElement.setAttribute('required', true);
    }
    if (field.disabled) {
      inputElement.setAttribute('disabled', true);
    }
    if (field.defaultValue || field.defaultValue===0) {
      inputElement.setAttribute('value', field.defaultValue);
    }
    if (field.placeholder) {
      inputElement.setAttribute('placeholder', field.placeholder);
    }
    if (field.maxlength) {
      inputElement.setAttribute('maxlength', field.maxlength);
    }
    if (field.minlength) {
      inputElement.setAttribute('minlength', field.minlength);
    }
    if (field.pattern) {
      inputElement.setAttribute('pattern', field.pattern);
    }
    if (field.size) {
      inputElement.setAttribute('size', field.size);
    }
    inputElement.classList.add('form-control');
    wrapper.appendChild(label);
    wrapper.appendChild(inputElement);
  
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.classList.add(
      'list-group',
      'position-absolute',
      'w-100',
      'mt-1',
      'z-index-100',
      'bg-white'
    );
    wrapper.appendChild(suggestionsContainer);
  
    let activeIndex = -1;
  
    inputElement.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      console.log("searchTerm",searchTerm)
      activeIndex = -1; 
      const orClause = field.display.map((key) => ({
        [key]: { like: searchTerm }
      }));
  
      const customEvent = new CustomEvent('requestData', {
        bubbles: true,
        cancelable: true,
        detail: {
          data: {
            appliedTo: field.appliedTo,
            dataModel: field.dataModel,
            dataParams: JSON.stringify({
              ...field.dataParams,
              where: {or:orClause},
            }),
          },
        },
      });
      this.dispatchEvent(customEvent);
    });
  
    const responseHandler = (event) => {
      const data = event.detail;
      if (field.appliedTo && data.appliedTo !== field.appliedTo) return;
      if (data.dataModel !== field.dataModel) return;
      suggestionsContainer.innerHTML = '';
      const dataObj = event.detail.res;
  
      if (Array.isArray(dataObj) && dataObj.length > 0) {
        dataObj.forEach((item, index) => {
          const suggestionItem = document.createElement('a');
          suggestionItem.className = 'list-group-item list-group-item-action';

          const displayText = field.display.map((key) => item[key]).join(' - ');
          suggestionItem.textContent = displayText;
          suggestionItem.setAttribute('data-id', item[field.value]);
          suggestionItem.setAttribute('data-index', index);
  
          suggestionItem.addEventListener('click', () => {
            inputElement.value = displayText;
            inputElement.setAttribute('data-id', item[field.value]);
            suggestionsContainer.innerHTML = '';
          });
  
          suggestionsContainer.appendChild(suggestionItem);
        });
      } else {
        const noResult = document.createElement('div');
        noResult.className = 'list-group-item text-muted';
        noResult.textContent = 'No results found';
        suggestionsContainer.appendChild(noResult);
      }
    };
  
    const handleKeyNavigation = (e) => {
      const items = suggestionsContainer.querySelectorAll('.list-group-item');
      if (items.length === 0) return;
  
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (activeIndex >= 0) {
          const selectedItem = items[activeIndex];
          inputElement.value = selectedItem.textContent;
          inputElement.setAttribute('data-id', selectedItem.getAttribute('data-id'));
          suggestionsContainer.innerHTML = '';
        }
      }
  
      items.forEach((item, index) => {
        item.classList.toggle('active', index === activeIndex);
      });
    };
  
    inputElement.addEventListener('keydown', handleKeyNavigation);
    this.addEventListener('responseData', responseHandler);
  
    form.appendChild(wrapper);
  }
  // handleSubmit(event) {
  //   event.preventDefault();
  //   console.log("event",event.target,this.particulars)
  //   const formData = new FormData(event.target);
  //   const formObject = {};
  //   formData.forEach((value, key) => {
  //     formObject[key] = value;
  //   });
  // const particularsArray = [];
  // const particularsKeys = Object.keys(formObject).filter(key => key.startsWith('particulars['));
  // particularsKeys.forEach(key => {
  //   const match = key.match(/particulars\[(\d+)\]\[(\w+)\]/);
  //   if (match) {
  //     const index = match[1];
  //     const field = match[2];
  //     if (!particularsArray[index]) {
  //       particularsArray[index] = {};
  //     }
  //     particularsArray[index][field] = formObject[key];
  //     delete formObject[key];
  //   }
  // });

  // formObject.particulars = particularsArray;
  //   const autocompleteFields = event.target.querySelectorAll('input[data-id]');
  //   autocompleteFields.forEach((input) => {
  //     const fieldName = input.getAttribute('name');
  //     formObject[fieldName] = input.getAttribute('data-id');
  //   });  

  //   const customEvent = new CustomEvent('submit', {
  //     bubbles: true,
  //     cancelable: true,
  //     detail: {
  //       data: {
  //         dataModel: 'accounting-orders',
  //         data: formObject,
  //       },
  //     },
  //   });
  //   this.dispatchEvent(customEvent);
  // }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const particularsArray = [];
    const particularsKeys = Object.keys(formObject).filter(key => key.startsWith('particulars['));
    particularsKeys.forEach(key => {
        const match = key.match(/particulars\[(\d+)\]\[(\w+)\]/);
        if (match) {
            const index = match[1];
            const field = match[2];
            if (!particularsArray[index]) {
                particularsArray[index] = {};
            }
            particularsArray[index][field] = formObject[key];
            delete formObject[key];
        }
    });
    formObject.particulars = particularsArray;
    const config = {};
    const configKeys = Object.keys(formObject).filter(key => key.startsWith('config.'));
    configKeys.forEach(key => {
        const newKey = key.replace('config.', ''); 
        config[newKey] = formObject[key];
        delete formObject[key]; 
    });
    const keysToConvert = [
      "subTotal",
      "discount",
      "discountedSubTotal",
      "taxTotal",
      "mrpTotal",
      "amount",
      "roundOff",
      "subTotalAmount"
    ];
    keysToConvert.forEach(key => {
      if (formObject[key] !== undefined) {
          formObject[key] = parseFloat(formObject[key]) || 0;
      }
    });
    formObject.config = config;
    formObject.category='Purchase'
    formObject.type='Purchase'
    delete formObject.lbt
    delete formObject.igst
    delete formObject.orderId
    // delete formObject.particulars[0][uid]
    // delete formObject.config.storageLocationId
    const autocompleteFields = event.target.querySelectorAll('input[data-id]');
    autocompleteFields.forEach((input) => {
        const fieldName = input.getAttribute('name');
        formObject[fieldName] = input.getAttribute('data-id');
    });
    const customEvent = new CustomEvent('submit', {
        bubbles: true,
        cancelable: true,
        detail: {
            data: {
                dataModel: 'accounting-orders',
                data: formObject,
            },
        },
    });
    // Dispatch the custom event
    this.dispatchEvent(customEvent);
}
}

customElements.define('invoice-form-component', InvoiceFormComponent);
if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: 'invoice-form-component', componentClass: InvoiceFormComponent });
