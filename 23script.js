document.addEventListener('DOMContentLoaded', ()=>{
  const input = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const list = document.getElementById('todoList');

  function save(items){
    localStorage.setItem('todo23_items', JSON.stringify(items));
  }

  function load(){
    try{
      const raw = localStorage.getItem('todo23_items');
      return raw ? JSON.parse(raw) : [];
    }catch(e){return []}
  }

  function render(){
    const items = load();
    list.innerHTML = '';
    if(items.length===0){
      const div = document.createElement('div');
      div.className = 'empty';
      div.textContent = 'タスクがありません。追加して始めましょう ✨';
      list.appendChild(div);
      return;
    }

    items.forEach((it, idx)=>{
      const li = document.createElement('li');
      li.className = 'todo-item enter';

      const text = document.createElement('div');
      text.className = 'todo-text';
      text.textContent = it.text;
      if(it.done) li.classList.add('done');

      const actions = document.createElement('div');
      actions.className = 'todo-actions';

      const ok = document.createElement('button');
      ok.className = 'icon-btn ok';
      ok.textContent = it.done ? '元に戻す' : '完了';
      ok.addEventListener('click', ()=>{
        items[idx].done = !items[idx].done;
        save(items);
        animateItem(li, ()=>render());
      });

      const del = document.createElement('button');
      del.className = 'icon-btn del';
      del.textContent = '削除';
      del.addEventListener('click', ()=>{
        items.splice(idx,1);
        save(items);
        animateRemove(li, ()=>render());
      });

      actions.appendChild(ok);
      actions.appendChild(del);

      li.appendChild(text);
      li.appendChild(actions);
      list.appendChild(li);

      // trigger show animation a tick later
      requestAnimationFrame(()=>{
        li.classList.remove('enter');
        li.classList.add('show');
      });
    });
  }

  function addTask(text){
    if(!text || !text.trim()) return;
    const items = load();
    items.unshift({text:text.trim(), done:false, created:Date.now()});
    save(items);
    render();
  }

  function animateItem(el, cb){
    el.classList.add('todo-item');
    el.style.transform = 'scale(.98)';
    setTimeout(()=>{ cb && cb(); },180);
  }

  function animateRemove(el, cb){
    el.style.transition = 'transform .28s ease, opacity .2s ease';
    el.style.transform = 'translateX(18px) scale(.96)';
    el.style.opacity = '0';
    setTimeout(()=>{ cb && cb(); },260);
  }

  addBtn.addEventListener('click', ()=>{ addTask(input.value); input.value=''; input.focus(); });
  input.addEventListener('keydown', (e)=>{ if(e.key==='Enter') { addTask(input.value); input.value=''; } });

  render();
});
