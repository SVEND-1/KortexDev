

document.addEventListener('DOMContentLoaded', async function() {
    const dashboard = document.getElementById('dashboard');
    const loginPage = document.getElementById('loginPage');

    async function checkAuth() {
        const isAuth = await ApiService.checkAuth();
        if (isAuth) {
            dashboard.style.display = 'block';
            loginPage.style.display = 'none';
            initDashboard();
        } else {
            dashboard.style.display = 'none';
            loginPage.style.display = 'flex';
            initLogin();
        }
    }

    // ===== ЛОГИН =====
    function initLogin() {
        const loginForm = document.getElementById('loginForm');
        const loginBtn = document.getElementById('loginBtn');
        const loginError = document.getElementById('loginError');

        if (!loginForm) return;

        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            if (!username || !password) {
                loginError.textContent = 'Заполните все поля';
                loginError.style.display = 'block';
                return;
            }

            loginBtn.disabled = true;
            loginBtn.textContent = 'Вход...';
            loginError.style.display = 'none';

            try {
                const data = await ApiService.login(username, password);
                if (data.success) {
                    window.location.reload();
                } else {
                    throw new Error(data.message || 'Ошибка авторизации');
                }
            } catch (error) {
                loginError.textContent = error.message || 'Ошибка соединения с сервером';
                loginError.style.display = 'block';
            } finally {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Войти';
            }
        });
    }

    // ===== DASHBOARD =====
    let currentTab = 'projects';
    let projects = [];
    let requests = [];
    let reviews = [];

    async function initDashboard() {
        await loadData();
        setupTabs();
        setupModals();
        setupLogout();
        renderTab('projects');
    }

    async function loadData() {
        try {
            [projects, requests, reviews] = await Promise.all([
                ApiService.adminGetProjects(),
                ApiService.adminGetRequests(),
                ApiService.adminGetReviews(),
            ]);

            projects = projects || [];
            requests = requests || [];
            reviews  = reviews  || [];

            const projectCount = document.getElementById('projectCount');
            const requestCount = document.getElementById('requestCount');
            const reviewCount  = document.getElementById('reviewCount');

            if (projectCount) projectCount.textContent = projects.length;
            if (requestCount) requestCount.textContent = requests.length;
            if (reviewCount)  reviewCount.textContent  = reviews.length;
        } catch (error) {
            console.error('Failed to load data:', error);
            showMessage('error', 'Ошибка загрузки данных');
        }
    }

    // ===== ТАБЫ =====
    function setupTabs() {
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentTab = this.dataset.tab;
                renderTab(currentTab);
            });
        });
    }

    function renderTab(tab) {
        document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
        const target = document.getElementById(`tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
        if (target) target.style.display = 'block';

        if (tab === 'projects') renderProjects();
        else if (tab === 'requests') renderRequests();
        else if (tab === 'reviews') renderReviews();
    }

    // ===== РЕНДЕР ПРОЕКТОВ =====
    function renderProjects() {
        const container = document.getElementById('projectsList');
        if (!container) return;

        if (projects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Нет проектов</p>
                    <button class="create-btn" id="emptyCreateBtn">Создать первый проект</button>
                </div>`;
            document.getElementById('emptyCreateBtn')?.addEventListener('click', window.openProjectModal);
            return;
        }

        container.innerHTML = `
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Иконка</th>
                            <th>Название</th>
                            <th>Изображения</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${projects.map(p => `
                            <tr>
                                <td>${p.id}</td>
                                <td>${getProjectTypeIcon(p.name)}</td>
                                <td>${p.name}</td>
                                <td>
                                    ${p.images && p.images.length > 0
            ? `<div class="image-preview">
                                            ${p.images.slice(0, 2).map(img => `
                                                <img src="${img}" alt="" class="thumbnail" onerror="this.style.display='none'" />
                                            `).join('')}
                                            ${p.images.length > 2 ? `<span>+${p.images.length - 2}</span>` : ''}
                                           </div>`
            : '<span class="no-image">Нет изображений</span>'
        }
                                </td>
                                <td>
                                    <button class="delete-btn" onclick="window.deleteProject(${p.id})">Удалить</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>`;
    }

    // ===== РЕНДЕР ЗАЯВОК =====
    function renderRequests() {
        const container = document.getElementById('requestsList');
        if (!container) return;

        if (requests.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Нет заявок</p></div>';
            return;
        }

        container.innerHTML = `
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr><th>ID</th><th>Имя</th><th>Юзернейм</th><th>Тип</th><th>Действия</th></tr>
                    </thead>
                    <tbody>
                        ${requests.map(r => `
                            <tr>
                                <td>${r.id}</td>
                                <td>${r.name}</td>
                                <td>${r.username}</td>
                                <td>${r.requestType || r.type || '—'}</td>
                                <td><button class="delete-btn" onclick="window.deleteRequest(${r.id})">Удалить</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>`;
    }

    // ===== РЕНДЕР ОТЗЫВОВ =====
    function renderReviews() {
        const container = document.getElementById('reviewsList');
        if (!container) return;

        if (reviews.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Нет отзывов</p></div>';
            return;
        }

        container.innerHTML = `
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr><th>ID</th><th>Имя</th><th>Отзыв</th><th>Дата</th><th>Действия</th></tr>
                    </thead>
                    <tbody>
                        ${reviews.map(r => `
                            <tr>
                                <td>${r.id}</td>
                                <td>${r.name}</td>
                                <td class="review-text">${r.review || '—'}</td>
                                <td>${r.createAt ? new Date(r.createAt).toLocaleDateString('ru-RU') : '—'}</td>
                                <td><button class="delete-btn" onclick="window.deleteReview(${r.id})">Удалить</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>`;
    }

    // ===== УДАЛЕНИЕ =====
    window.deleteProject = async function(id) {
        if (!confirm('Удалить проект?')) return;
        try {
            await ApiService.deleteProject(id);
            showMessage('success', 'Проект удалён');
            await loadData();
            renderTab('projects');
        } catch (error) {
            showMessage('error', 'Ошибка удаления: ' + error.message);
        }
    };

    window.deleteRequest = async function(id) {
        if (!confirm('Удалить заявку?')) return;
        try {
            await ApiService.deleteRequest(id);
            showMessage('success', 'Заявка удалена');
            await loadData();
            renderTab('requests');
        } catch (error) {
            showMessage('error', 'Ошибка удаления: ' + error.message);
        }
    };

    window.deleteReview = async function(id) {
        if (!confirm('Удалить отзыв?')) return;
        try {
            await ApiService.deleteReview(id);
            showMessage('success', 'Отзыв удалён');
            await loadData();
            renderTab('reviews');
        } catch (error) {
            showMessage('error', 'Ошибка удаления: ' + error.message);
        }
    };

    // ===== LOGOUT =====
    function setupLogout() {
        document.getElementById('logoutBtn')?.addEventListener('click', function() {
            // Spring сессия сбрасывается на сервере, просто перезагружаем
            window.location.reload();
        });
    }

    // ===== СООБЩЕНИЯ =====
    function showMessage(type, text) {
        const msg = document.getElementById('message');
        if (!msg) return;
        msg.textContent = text;
        msg.className = `message ${type}`;
        msg.style.display = 'block';
        setTimeout(() => { msg.style.display = 'none'; }, 4000);
    }

    // ===== МОДАЛ СОЗДАНИЯ ПРОЕКТА =====
    function setupModals() {
        const modal      = document.getElementById('projectModal');
        const openBtn    = document.getElementById('createProjectBtn');
        const closeBtn   = document.getElementById('closeProjectModal');
        const cancelBtn  = document.getElementById('cancelProjectBtn');
        const submitBtn  = document.getElementById('submitProjectBtn');
        const nameInput  = document.getElementById('projectName');
        const imagesInput = document.getElementById('projectImages');

        window.openProjectModal = function() {
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };

        function closeModal() {
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
                document.body.style.overflow = '';
                if (nameInput)   nameInput.value = '';
                if (imagesInput) imagesInput.value = '';
                updatePreview();
            }
        }

        openBtn?.addEventListener('click', window.openProjectModal);
        closeBtn?.addEventListener('click', closeModal);
        cancelBtn?.addEventListener('click', closeModal);
        modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
        nameInput?.addEventListener('input', updatePreview);
        imagesInput?.addEventListener('change', updatePreview);

        function updatePreview() {
            const name  = nameInput?.value.trim() || '';
            const files = imagesInput?.files;
            const previewName  = document.getElementById('previewName');
            const previewIcon  = document.getElementById('previewIcon');
            const previewCount = document.getElementById('previewCount');
            const imageArea    = document.getElementById('previewImageArea');

            if (previewName) previewName.textContent = name || 'Название проекта';
            if (previewIcon) previewIcon.textContent = getProjectTypeIcon(name || 'проект');

            if (files && files.length > 0 && imageArea) {
                const reader = new FileReader();
                reader.onload = e => {
                    imageArea.innerHTML = `<img src="${e.target.result}" alt="Preview" style="width:100%;height:100%;object-fit:cover;" />`;
                };
                reader.readAsDataURL(files[0]);
                if (previewCount) {
                    const n = files.length;
                    previewCount.textContent = `${n} ${n === 1 ? 'изображение' : n < 5 ? 'изображения' : 'изображений'}`;
                }
            } else if (imageArea) {
                imageArea.innerHTML = `<div class="card-image-placeholder"><span>🖼️</span><p>Изображения не выбраны</p></div>`;
                if (previewCount) previewCount.textContent = '0 изображений';
            }
        }

        submitBtn?.addEventListener('click', async function() {
            const name  = nameInput?.value.trim() || '';
            const files = imagesInput?.files;

            if (!name) {
                showMessage('error', 'Введите название проекта');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Создание...';

            try {
                await ApiService.createProject(name, files);
                showMessage('success', 'Проект создан');
                closeModal();
                await loadData();
                renderTab('projects');
            } catch (error) {
                showMessage('error', 'Ошибка создания: ' + error.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Создать';
            }
        });

        updatePreview();
    }

    function getProjectTypeIcon(name) {
        const lower = name.toLowerCase();
        if (lower.includes('лендинг') || lower.includes('landing')) return '📄';
        if (lower.includes('платформ') || lower.includes('platform')) return '⚙️';
        if (lower.includes('мобильн') || lower.includes('mobile')) return '📱';
        return '🌐';
    }

    await checkAuth();
});
