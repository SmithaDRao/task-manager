// set current date and time
let now = new Date().toDateString();
document.querySelector("#currentDate").innerHTML = now;

// const CHECK = "fa-check-circle";
// const UNCHECK = "fa-circle-thin";
// const LINE_THROUGH = "lineThrough";


// Storage Controller
const StorageCtrl = (function(){
  // Public methods
  return {
    storeItem: function(item){
      let items;
      // Check if any items in local storage
      if(localStorage.getItem('items') === null){
        // if nothing then set items to empay array
        items = [];
        // Push new item
        items.push(item);
        // Set local storage. JSON.stringify converts object to JSON string
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in ls
        // When receiving data from a web server, the data is always string. JSON.parse convert data to JavaScript object.
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item in the object
        items.push(item);

        // Re set ls and again convert object to string
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    // get items from localStorage
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    //  update item in the localStorage
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(updatedItem.id === item.id){
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    // delete item in the localStorage
    deleteItemFromStorage: function(id){
     
      let items = JSON.parse(localStorage.getItem('items'));
      
      items.forEach(function(item, index){
        if(id === item.id){
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    clearItemsFromStorage: function(){
      if (confirm(`Permanently remove from list?` ))
      
      { document.querySelector('#loading').style.display = "block";

        localStorage.removeItem('items');
       }
       {location.reload();
        document.querySelector('#loading').style.display = "block";
      }
    } 
  }
})();

//     clearItemsFromStorage: function(){
//       if (confirm(`Permanently remove from list?` )){
// document.querySelector('#loading').style.display = "block";
//  localStorage.removeItem('items');
//       setTimeout(function(){ 
//      document.querySelector('#loading').style.display = "none";
//     location.reload(); 
//   }, 3000);}
//   }
  

// Item Controller
const ItemCtrl = (function(){
  // Item Constructor
  const Item = function(id, name, assignTo, description, date){
    this.id = id;
    this.name = name;
    this.assignTo = assignTo;
    this.description = description;
    this.date = date;
  }

  // Data Structure / State
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null
  }

  // Public methods
  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(name, assignTo, description, date){
      let ID;
      // Create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item
      newItem = new Item(ID, name, assignTo, description, date);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id){
      let found = null;
      // Loop through items
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, assignTo, description, date){

      let found = null;

      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.assignTo = assignTo;
          item.description = description;
          item.date = date;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id){
      // Get ids
      const ids = data.items.map(function(item){
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: function(){
      
      data.items = [];
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    },
    getTotalDate: function(){
      let total = 0;

      // Loop through items and add cals
      data.items.forEach(function(item){
        total += item.date;
      });

    },
    logData: function(){
      return data;
    }
  }
})();


function myFunction() {
 var x = document.getElementById("taskDueDay").value;
 
 document.getElementById("demo").innerHTML = x;
    }
  
// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemInput: '.form-control',
    assignTo: '#assign-to',
    description: '#description'
  }
  
  // Public methods
  return {
    populateItemList: function(items){
      let html = '';

      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em> Due to ${item.date} </em>
        <br>
        <em>Assign To: ${item.assignTo} &nbsp;&nbsp;&nbsp; 
        <br>Description: ${item.description}</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });



      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return {
        name:document.querySelector(UISelectors.itemNameInput).value,
        assignTo:document.querySelector
        (UISelectors.assignTo).value,
        description:document.querySelector
        (UISelectors.description).value,
        date:document.querySelector(UISelectors.itemInput).value
      }
    },
    addListItem: function(item){
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em> Due to ${item.date} </em>
      <br>
      <em>Assign To: ${item.assignTo} &nbsp;&nbsp;&nbsp; 
      <br>Description: ${item.description}</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em> Due to ${item.date}</em>
          <br>
          <em>Assign To: ${item.assignTo} &nbsp;&nbsp;&nbsp; 
          <br>
          Description: ${item.description}</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.assignTo).value = '';
      document.querySelector(UISelectors.description).value = '';
      document.querySelector(UISelectors.itemInput).value = '';
    },
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.assignTo).value = ItemCtrl.getCurrentItem().assignTo;
      document.querySelector(UISelectors.description).value = ItemCtrl.getCurrentItem().description;
      document.querySelector(UISelectors.itemInput).value = ItemCtrl.getCurrentItem().date;
      UICtrl.showEditState();
    },
    removeItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(item){
        item.remove();
      });
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
   
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function(){
      return UISelectors;
    }
  }
})();

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  // Load event listeners
  const loadEventListeners = function(){
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

     // Back button event
     document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

     // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  // Add item submit
  const itemAddSubmit = function(e){
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and date input
    if(input.name !== '' || input.date !== ''){
      //  (function(){
      //    const adiv = document.createElement('div');
      //    adiv.appendChild(document.createTextNode('No input'));
      //    const card = document.querySelector('.card');
      //    const cardcontent = document.querySelector('.card-content');
      //    card.insertBefore(adiv, cardcontent);
      //    }());
      //    setTimeout(function(){
      //     document.querySelector('.adiv').remove();},2000);
      //  }
       
      // else
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.assignTo, input.description, input.date);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      //Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }
    
    e.preventDefault();
  }
  

  // Click edit item
  const itemEditClick = function(e){
    if(e.target.classList.contains('edit-item')){
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

  // Update item submit
  const itemUpdateSubmit = function(e){
    // Get item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.assignTo, input.description, input.date);

    // Update UI
    UICtrl.updateListItem(updatedItem);

     // Update local storage
     StorageCtrl.updateItemStorage(updatedItem);

     UICtrl.clearEditState();

    e.preventDefault();
  }

  // Delete button event
  const itemDeleteSubmit = function(e){

    e.preventDefault();
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(clientInformation);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Delete from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();
  }


  // Clear items event
  const clearAllItemsClick = function(){
    
    document.querySelector('#loading').style.display = "block";
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Remove from UI
    UICtrl.removeItems();

    // Clear from local storage
    StorageCtrl.clearItemsFromStorage();
   

    // Hide UL
    UICtrl.hideList();
    }
  

  // Public methods
  return {
    init: function(){
      // Clear edit state / set initial set
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if(items.length === 0){
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Load event listeners
      loadEventListeners();
    }
  }
  
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();
