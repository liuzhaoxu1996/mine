/* 
 * 获取开始按钮
 * 获取box
 * 获取flagBox  
 */
var startBtn = document.getElementById('startBtn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var mineMap = [];
// 雷数量
var minesNum;
// 已经被标记雷的数量
var mineOver;
var alertBox = document.getElementById('alertBox');
var close = document.getElementById('close');
var alertImg = document.getElementById('alertImg');
var score = document.getElementById('score');
var lock = true;
// 绑定所有点击事件
function bindEvent() {
  startBtn.onclick = function () {
    if (lock) {
      lock = false;
      box.style.display = 'block';
      flagBox.style.display = 'block';
      // 生成棋盘，雷
      init();
      
    }
  }
}
// 取消默认事件
box.oncontextmenu = function () {
  return false;
}
box.onmousedown = function (e) {
  // 获取事件源对象
  var event = e.target;
  if (e.which == 1) {
    leftClick(event);
  } else if (e.which == 3) {
    rightChlick(event);
  }
}
close.onclick = function () {
  alertBox.style.display = 'none';
  close.style.display = 'none';
  lock = true;
}
bindEvent();

function init() {
  minesNum = 20;
  mineOver = 20;
  score.innerText = mineOver;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      var con = document.createElement('div');
      con.classList.add('block');
      con.setAttribute('id', i + '-' + j);
      box.appendChild(con);
      mineMap.push({
        mine: 0
      })
    }
  }
  // 获取所有div.block, 小格子
  var block = document.getElementsByClassName('block');

  while (minesNum) {
    var mineIndex = Math.floor(Math.random() * 100);
    if (mineMap[mineIndex].mine === 0) {
      mineMap[mineIndex].mine = 1;
      block[mineIndex].classList.add('isLei');
      minesNum--; 
      console.log(mineIndex);
    }
  }
}

function leftClick(dom) {
  if (dom.classList.contains('flag')) {
    return;
  }
  console.log(dom)
  var isLei = document.getElementsByClassName("isLei");
  if (dom.classList.contains('isLei')) {
    for (let i = 0; i < isLei.length; i++) {
      isLei[i].classList.add('show');
    }
    setTimeout(function () {
      alertBox.style.display = 'block';
      close.style.display = 'block';
      alertImg.style.backgroundImage = 'url(/Users/lius/Desktop/面试/面试项目/扫雷/src/img/fail.jpg)';
    }, 100)
  } else {
    var n = 0;
    // console.log(dom.getAttribute('id'))
    var posArr = dom.getAttribute('id').split('-');
    var posX = posArr && posArr[0];
    var posY = posArr && posArr[1];
    // console.log(posX - 1, posY - 1);
    console.log(parseInt(posX) + 1, parseInt(posY) + 1);
    dom && dom.classList.add('num');
    for (let i = parseInt(posX) - 1; i <= parseInt(posX) + 1; i++) {
      for (let j = parseInt(posY) - 1; j <= parseInt(posY) + 1; j++) {
        // 获取周围8个格子
        var arroundBox = document.getElementById(i + '-' + j);
        if (arroundBox && arroundBox.classList.contains('isLei')) {
          n++;
        }
      }
    }
    dom.innerHTML = n;
    if (n == 0) {
      for (var i = parseInt(posX) - 1; i <= parseInt(posX) + 1; i++) {
        for (var j = parseInt(posY) - 1; j <= parseInt(posY) + 1; j++) {
          // 获取周围8个格子
          var nearBox = document.getElementById(i + '-' + j);
          if (nearBox && nearBox.length != 0) {
            if (!nearBox.classList.contains('check')) {
              nearBox.classList.add('check');
              leftClick(nearBox);
            }
          }
        }
      }
    }
  }
}

function rightChlick(dom) {
  if (dom.classList.contains('num')) {
    return;
  }
  dom.classList.toggle('flag');
  if (dom.classList.contains('flag') && dom.classList.contains('isLei')) {
    mineOver--;
  }
  if (!dom.classList.contains('flag') && dom.classList.contains('isLei')) {
    mineOver++;
  }
  score.innerHTML = mineOver;
  if (mineOver == 0) {
    setTimeout(function () {
      alertImg.style.backgroundImage = 'url(/Users/lius/Desktop/面试/面试项目/扫雷/src/img/success.jpeg)';
      alertBox.style.display = 'block';
      close.style.display = 'block';
    }, 100)
  }
}