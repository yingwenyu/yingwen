document.addEventListener('DOMContentLoaded', function() {
    // 獲取DOM元素
    const categoryCards = document.querySelectorAll('.category-card');
    const subcategorySelection = document.getElementById('subcategory-selection');
    const subcategoryItems = document.getElementById('subcategory-items');
    const colorSelection = document.getElementById('color-selection');
    const colorOptions = document.querySelectorAll('.color-option');
    const modelImage = document.getElementById('model-image');
    const rotatingText = document.getElementById('rotating-text');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    
    // 當前選擇的類別和子類別
    let currentCategory = null;
    let currentSubcategory = null;
    let currentColor = null;
    
    // 服裝飾品數據
    const itemsData = {
        clothes: [
            { id: 'tshirt', name: 'T恤', image: 'tshirt.svg' },
            { id: 'shirt', name: '襯衫', image: 'shirt.svg' },
            { id: 'sweater', name: '毛衣', image: 'sweater.svg' },
            { id: 'jacket', name: '外套', image: 'jacket.svg' }
        ],
        pants: [
            { id: 'jeans', name: '牛仔褲', image: 'jeans.svg' },
            { id: 'shorts', name: '短褲', image: 'shorts.svg' },
            { id: 'sweatpants', name: '運動褲', image: 'sweatpants.svg' }
        ],
        shoes: [
            { id: 'sneakers', name: '運動鞋', image: 'sneakers.svg' },
            { id: 'boots', name: '靴子', image: 'boots.svg' },
            { id: 'sandals', name: '涼鞋', image: 'sandals.svg' }
        ],
        hats: [
            { id: 'cap', name: '棒球帽', image: 'cap.svg' },
            { id: 'beanie', name: '毛線帽', image: 'beanie.svg' },
            { id: 'sunhat', name: '太陽帽', image: 'sunhat.svg' }
        ],
        skirts: [
            { id: 'miniskirt', name: '迷你裙', image: 'miniskirt.svg' },
            { id: 'pleatedskirt', name: '百褶裙', image: 'pleatedskirt.svg' },
            { id: 'longskirt', name: '長裙', image: 'longskirt.svg' }
        ]
    };
    
    // 初始化頁面
    function init() {
        // 為大分類卡片添加點擊事件
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                selectCategory(category, this);
            });
        });
        
        // 為顏色選項添加點擊事件
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                const color = this.getAttribute('data-color');
                selectColor(color, this);
            });
        });
        
        // 為模態框關閉按鈕添加點擊事件
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // 選擇大分類
    function selectCategory(category, element) {
        // 重置當前選擇
        resetSelection();
        
        // 更新當前類別
        currentCategory = category;
        
        // 更新UI
        categoryCards.forEach(card => {
            card.classList.remove('active');
            card.classList.add('inactive');
        });
        element.classList.add('active');
        element.classList.remove('inactive');
        
        // 如果選擇的是「其他」類別
        if (category === 'other') {
            handleOtherCategory();
            return;
        }
        
        // 顯示模特兒
        modelImage.style.display = 'block';
        rotatingText.style.display = 'none';
        
        // 顯示子分類
        showSubcategories(category);
    }
    
    // 顯示子分類
    function showSubcategories(category) {
        // 清空子分類容器
        subcategoryItems.innerHTML = '';
        
        // 獲取該類別的子分類數據
        const items = itemsData[category] || [];
        
        // 創建子分類項目
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'subcategory-item';
            itemElement.setAttribute('data-id', item.id);
            
            // 使用本地圖像
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="subcategory-name">${item.name}</div>
            `;
            
            // 添加點擊事件
            itemElement.addEventListener('click', function() {
                selectSubcategory(item.id, this);
            });
            
            subcategoryItems.appendChild(itemElement);
        });
        
        // 顯示子分類選擇區域
        subcategorySelection.style.display = 'block';
        colorSelection.style.display = 'none';
    }
    
    // 選擇子分類
    function selectSubcategory(subcategoryId, element) {
        // 更新當前子分類
        currentSubcategory = subcategoryId;
        
        // 更新UI
        const subcategoryElements = document.querySelectorAll('.subcategory-item');
        subcategoryElements.forEach(item => {
            item.classList.remove('active');
            item.classList.add('inactive');
        });
        element.classList.add('active');
        element.classList.remove('inactive');
        
        // 顯示顏色選擇
        colorSelection.style.display = 'block';
        
        // 更新模特兒穿著
        updateModelClothing();
    }
    
    // 選擇顏色
    function selectColor(color, element) {
        // 更新當前顏色
        currentColor = color;
        
        // 更新UI
        colorOptions.forEach(option => {
            option.classList.remove('active');
        });
        element.classList.add('active');
        
        // 更新模特兒穿著
        updateModelClothing();
    }
    
    // 更新模特兒穿著
    function updateModelClothing() {
        // 在實際應用中，這裡應該根據選擇的服裝和顏色更新模特兒的圖像
        // 這裡僅做示意，實際項目中應替換為真實邏輯
        console.log(`更新模特兒穿著: 類別=${currentCategory}, 子類別=${currentSubcategory}, 顏色=${currentColor}`);
    }
    
    // 處理「其他」類別
    function handleOtherCategory() {
        // 隱藏模特兒，顯示旋轉文字
        modelImage.style.display = 'none';
        rotatingText.style.display = 'block';
        
        // 隱藏子分類和顏色選擇
        subcategorySelection.style.display = 'none';
        colorSelection.style.display = 'none';
        
        // 添加點擊事件監聽器
        document.addEventListener('click', handleDocumentClick);
    }
    
    // 處理文檔點擊事件（用於「其他」類別）
    function handleDocumentClick(event) {
        // 檢查點擊是否在旋轉文字區域外
        const isClickInsideRotatingText = rotatingText.contains(event.target);
        const isClickOnCategoryCard = event.target.closest('.category-card');
        
        if (!isClickInsideRotatingText && !isClickOnCategoryCard && rotatingText.style.display === 'block') {
            // 顯示彈出提示框
            modal.style.display = 'flex';
            
            // 移除點擊事件監聽器，避免重複觸發
            document.removeEventListener('click', handleDocumentClick);
        }
    }
    
    // 重置選擇
    function resetSelection() {
        currentSubcategory = null;
        currentColor = null;
        
        // 移除文檔點擊事件監聽器
        document.removeEventListener('click', handleDocumentClick);
        
        // 重置UI
        const subcategoryElements = document.querySelectorAll('.subcategory-item');
        subcategoryElements.forEach(item => {
            item.classList.remove('active');
            item.classList.remove('inactive');
        });
        
        colorOptions.forEach(option => {
            option.classList.remove('active');
        });
    }
    
    // 初始化頁面
    init();
});