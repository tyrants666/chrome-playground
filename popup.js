// CLASS WOKSPACE -----------------------------------------------------------------
// class workspaceClass {
//   constructor(wsName){
//     this.wsName = wsName;
//   }
//   //Save -------------------------------------
//   workspace_save(){

//   }
//   //Create Workspace Elem ---------------------------------------------------
//   workspace_create_elem(ws_id, ws_name) {

//   }
// }
// END CLASS WOKSPACE -----------------------------------------------------------------
// END CLASS WOKSPACE -----------------------------------------------------------------



let wsId = 0;
let workspaces = new Object();
localStorage_get('onload')



//Add Group Onclick / Enter --------------------------------------
const saveBtn = document.querySelector(".save");
const wsInput = document.querySelector('#workspace-name');

//Input on enter
wsInput.onkeypress = e => {
  if (e.key === "Enter"){ saveBtn.click(); }
}

//Save on click
saveBtn.addEventListener("click", async () => {
  const wsName = wsInput.value;
  localStorage_get()
  if (wsName) {
    window.wsObj = new workspaceClass(wsName)
    wsObj.workspace_save();
    wsObj.workspace_tabs_group(wsName);
  } else {
    console.error('Please Enter Workspace Name');
  }
});


// Workspace remove -----------------------------------------------
let all_remove = document.querySelectorAll('svg.ws-remove');
for (const remove of all_remove) {
  remove.onclick = e => {
    let ws_id = remove.parentElement.getAttribute('data-ws-id');
    delete workspaces[ws_id]
    localStorage_set()
    remove.parentElement.remove();
  }
}

// Local Storage Functions----------------------------------------------

// Set
function localStorage_set() {
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
}

// Get
function localStorage_get(trigger) {
  window.wsItem = {}
  if(localStorage['workspaces']){
    wsItem = JSON.parse(localStorage.getItem('workspaces'));
    
        if (trigger == 'onload') {
          window.wsObj = new workspaceClass()
          for (const key of Object.keys(wsItem)) {
            wsObj.workspace_create_elem(key, wsItem[key]['workspace_name'])
          }
        }

  }
  workspaces = wsItem;
}