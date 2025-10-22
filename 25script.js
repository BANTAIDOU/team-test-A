// 41script.js - 25top.htmlのための動きのあるJavaScript

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeFloatingShapes();
    initializeInteractiveProblems();
    initializeAnimations();
    initializeMathVisualizations();
    initializeScrollEffects();
    console.log('数学の世界へようこそ！🔢');
});

// 浮遊する幾何学図形の初期化
function initializeFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    const shapeTypes = ['circle', 'triangle', 'square', 'hexagon'];
    const colors = ['rgba(100, 181, 246, 0.1)', 'rgba(66, 165, 245, 0.1)', 'rgba(227, 242, 253, 0.2)'];
    
    // 既存の図形を削除
    shapesContainer.innerHTML = '';
    
    // 15個のランダムな図形を作成
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        
        shape.className = `shape ${shapeType}`;
        
        // ランダムなサイズと位置
        const size = Math.random() * 60 + 30;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animationDelay = Math.random() * 8;
        const animationDuration = Math.random() * 4 + 6;
        
        if (shapeType !== 'triangle' && shapeType !== 'hexagon') {
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            shape.style.background = colors[Math.floor(Math.random() * colors.length)];
        }
        
        shape.style.left = left + '%';
        shape.style.top = top + '%';
        shape.style.animationDelay = animationDelay + 's';
        shape.style.animationDuration = animationDuration + 's';
        
        shapesContainer.appendChild(shape);
    }
    
    // 図形の動的な移動
    setInterval(moveShapesRandomly, 10000);
}

// 図形をランダムに移動させる
function moveShapesRandomly() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        const newLeft = Math.random() * 100;
        const newTop = Math.random() * 100;
        
        shape.style.transition = 'all 8s ease-in-out';
        shape.style.left = newLeft + '%';
        shape.style.top = newTop + '%';
        
        // トランジション終了後にリセット
        setTimeout(() => {
            shape.style.transition = '';
        }, 8000);
    });
}

// インタラクティブな問題の初期化
function initializeInteractiveProblems() {
    const problems = document.querySelectorAll('.interactive-problem');
    
    problems.forEach(problem => {
        const button = problem.querySelector('.reveal-answer');
        const answerDiv = problem.querySelector('.answer');
        
        if (button && answerDiv) {
            // 初期状態では答えを非表示
            answerDiv.style.display = 'none';
            answerDiv.style.opacity = '0';
            answerDiv.style.transform = 'translateY(-20px)';
            
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (answerDiv.style.display === 'none') {
                    // 答えを表示
                    answerDiv.style.display = 'block';
                    setTimeout(() => {
                        answerDiv.style.transition = 'all 0.5s ease-out';
                        answerDiv.style.opacity = '1';
                        answerDiv.style.transform = 'translateY(0)';
                    }, 10);
                    
                    button.textContent = '答えを隠す';
                    button.style.background = '#ff7043';
                    
                    // 祝福エフェクト
                    createCelebrationEffect(problem);
                } else {
                    // 答えを隠す
                    answerDiv.style.opacity = '0';
                    answerDiv.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        answerDiv.style.display = 'none';
                    }, 500);
                    
                    button.textContent = '答えを見る';
                    button.style.background = '#64b5f6';
                }
            });
        }
    });
}

// 祝福エフェクトを作成
function createCelebrationEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #64b5f6, #42a5f5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${centerX}px;
            top: ${centerY}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 12) * 2 * Math.PI;
        const distance = 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}

// アニメーションの初期化
function initializeAnimations() {
    // カードのスタッガード アニメーション
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.2 + index * 0.1}s`;
    });
    
    // 数学記号の回転アニメーション
    const mathSymbols = document.querySelectorAll('.math-symbol');
    mathSymbols.forEach(symbol => {
        symbol.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(360deg) scale(1.2)';
            this.style.transition = 'transform 0.6s ease-in-out';
        });
        
        symbol.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
    
    // 数式のパルス効果
    const formulas = document.querySelectorAll('.math-formula');
    formulas.forEach(formula => {
        formula.addEventListener('click', function() {
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 2000);
        });
    });
}

// 数学的視覚化の初期化
function initializeMathVisualizations() {
    // フィボナッチ螺旋のアニメーション
    const fibonacciElements = document.querySelectorAll('.fibonacci-spiral');
    fibonacciElements.forEach(element => {
        animateFibonacciSpiral(element);
    });
    
    // 黄金比の視覚化
    const goldenRatioElements = document.querySelectorAll('.golden-ratio');
    goldenRatioElements.forEach(element => {
        visualizeGoldenRatio(element);
    });
}

// フィボナッチ螺旋のアニメーション
function animateFibonacciSpiral(container) {
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    canvas.style.cssText = `
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
    `;
    
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    let angle = 0;
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21];
    
    function drawSpiral() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#64b5f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        for (let i = 0; i < angle; i += 0.1) {
            const radius = i * 2;
            const x = centerX + Math.cos(i) * radius;
            const y = centerY + Math.sin(i) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        angle += 0.05;
        
        if (angle > 15) {
            angle = 0;
        }
        
        requestAnimationFrame(drawSpiral);
    }
    
    drawSpiral();
}

// 黄金比の視覚化
function visualizeGoldenRatio(container) {
    if (!container) return;
    
    const rect1 = document.createElement('div');
    const rect2 = document.createElement('div');
    
    rect1.style.cssText = `
        width: 89px;
        height: 55px;
        background: linear-gradient(45deg, #64b5f6, #42a5f5);
        border-radius: 5px;
        margin: 5px;
        display: inline-block;
        animation: goldenPulse 3s ease-in-out infinite;
    `;
    
    rect2.style.cssText = `
        width: 55px;
        height: 34px;
        background: linear-gradient(45deg, #42a5f5, #1976d2);
        border-radius: 5px;
        margin: 5px;
        display: inline-block;
        animation: goldenPulse 3s ease-in-out infinite 0.5s;
    `;
    
    container.appendChild(rect1);
    container.appendChild(rect2);
    
    // CSS アニメーションの追加
    if (!document.querySelector('#golden-ratio-styles')) {
        const style = document.createElement('style');
        style.id = 'golden-ratio-styles';
        style.textContent = `
            @keyframes goldenPulse {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// スクロール効果の初期化
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // パララックス効果
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index % 3) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // カードのフェードイン効果
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = cardTop < window.innerHeight - 100;
            
            if (cardVisible && !card.classList.contains('visible')) {
                card.classList.add('visible');
                card.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ナビゲーションのスムーズスクロール
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 数学クイズの機能
function createMathQuiz() {
    const quizzes = [
        {
            question: "0.999... は 1 と等しいでしょうか？",
            answer: "はい！0.999... = 1 です。これは数学的に証明できる興味深い等式です。",
            explanation: "x = 0.999... とすると、10x = 9.999... よって 10x - x = 9 となり、9x = 9 なので x = 1"
        },
        {
            question: "π（パイ）は有理数でしょうか？",
            answer: "いいえ、πは無理数です。",
            explanation: "πは無理数で超越数でもあります。つまり、どんな有理係数の多項式の根にもなりません。"
        },
        {
            question: "1 + 2 + 3 + ... + 100 = ?",
            answer: "5050です！",
            explanation: "ガウスが発見した公式：n(n+1)/2 を使うと、100×101/2 = 5050"
        }
    ];
    
    return quizzes;
}

// キーボードショートカット
document.addEventListener('keydown', function(e) {
    // Spaceキーで新しい図形を追加
    if (e.code === 'Space' && !e.target.matches('input, textarea, button')) {
        e.preventDefault();
        addRandomShape();
    }
    
    // Enterキーで数学ファクトを表示
    if (e.code === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        showRandomMathFact();
    }
});

// ランダムな図形を追加
function addRandomShape() {
    const shapesContainer = document.querySelector('.floating-shapes');
    const shapeTypes = ['circle', 'triangle', 'square'];
    const colors = ['rgba(100, 181, 246, 0.2)', 'rgba(66, 165, 245, 0.2)'];
    
    const shape = document.createElement('div');
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    
    shape.className = `shape ${shapeType}`;
    shape.style.width = '40px';
    shape.style.height = '40px';
    shape.style.background = colors[Math.floor(Math.random() * colors.length)];
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';
    shape.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    shapesContainer.appendChild(shape);
    
    // 5秒後に削除
    setTimeout(() => {
        if (shape.parentNode) {
            shape.parentNode.removeChild(shape);
        }
    }, 5000);
}

// ランダムな数学ファクトを表示
function showRandomMathFact() {
    const facts = [
        "虚数の単位 i を4回掛けると 1 になります！",
        "オイラーの等式 e^(iπ) + 1 = 0 は数学で最も美しい式とされています",
        "∞ - ∞ は不定形で、答えは一意に決まりません",
        "0! = 1 です（0の階乗は1）",
        "黄金比 φ = (1+√5)/2 ≈ 1.618 は自然界にたくさん現れます"
    ];
    
    const fact = facts[Math.floor(Math.random() * facts.length)];
    
    // 一時的な通知を作成
    const notification = document.createElement('div');
    notification.textContent = '💡 ' + fact;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #64b5f6, #42a5f5);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(100, 181, 246, 0.3);
        z-index: 1000;
        max-width: 300px;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// 必要なCSSアニメーションを追加
if (!document.querySelector('#dynamic-animations')) {
    const style = document.createElement('style');
    style.id = 'dynamic-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ページ離脱時のメッセージ
window.addEventListener('beforeunload', function() {
    console.log('数学の旅を楽しんでいただき、ありがとうございました！ 📚✨');
});