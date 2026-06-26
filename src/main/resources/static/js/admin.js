// ===== ADMIN PANEL =====

document.addEventListener('DOMContentLoaded', function() {
    const dashboard = document.getElementById('dashboard');
    const loginPage = document.getElementById('loginPage');

    // ===== ПРОВЕРКА АВТОРИЗАЦИИ =====
    function checkAuth() {
        try {
            const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
            if (isAuth) {
                dashboard.style.display = 'block';
                loginPage.style.display = 'none';
                initDashboard();
            } else {
                dashboard.style.display = 'none';
                loginPage.style.display = 'flex';
                initLogin();
            }
        } catch(e) {
            dashboard.style.display = 'none';
            loginPage.style.display = 'flex';
            initLogin();
        }
    }

    // ===== ЛОГИН ТОЛЬКО ЧЕРЕЗ БЭКЕНД =====
    function initLogin() {
        const loginForm = document.getElementById('loginForm');
        const loginBtn = document.getElementById('loginBtn');
        const loginError = document.getElementById('loginError');

        if (loginForm) {
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
                    // ===== ЗАПРОС К БЭКЕНДУ =====
                    const response = await fetch(
                        `/api/admin/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
                        {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (!response.ok) {
                        let errorMsg = 'Неверный логин или пароль';
                        try {
                            const errorData = await response.json();
                            errorMsg = errorData.error || errorData.message || errorMsg;
                        } catch {
                            if (response.status === 401) {
                                errorMsg = 'Неверный логин или пароль';
                            } else if (response.status === 404) {
                                errorMsg = 'Сервер не найден. Проверьте подключение.';
                            } else {
                                errorMsg = `Ошибка: ${response.status}`;
                            }
                        }
                        throw new Error(errorMsg);
                    }

                    const data = await response.json();

                    if (data.success) {
                        try {
                            localStorage.setItem('adminAuthenticated', 'true');
                        } catch(e) {}
                        window.location.reload();
                    } else {
                        throw new Error(data.message || 'Ошибка авторизации');
                    }

                } catch (error) {
                    console.error('Login error:', error);
                    loginError.textContent = error.message || 'Ошибка соединения с сервером';
                    loginError.style.display = 'block';
                    loginBtn.disabled = false;
                    loginBtn.textContent = 'Войти';
                }
            });
        }
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
        initButtons();
    }

    async function loadData() {
        try {
            projects = await ApiService.getAllProjects() || [];
            requests = await ApiService.getRequests() || [];
            reviews = await ApiService.getReviews(100) || [];

            const projectCount = document.getElementById('projectCount');
            const requestCount = document.getElementById('requestCount');
            const reviewCount = document.getElementById('reviewCount');

            if (projectCount) projectCount.textContent = projects.length;
            if (requestCount) requestCount.textContent = requests.length;
            if (reviewCount) reviewCount.textContent = reviews.length;
        } catch (error) {
            console.error('Failed to load data:', error);
            showMessage('error', 'Ошибка загрузки данных');
        }
    }

    function setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
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

    function renderProjects() {
        const container = document.getElementById('projectsList');
        if (!container) return;

        if (projects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Нет проектов</p>
                    <button class="create-btn" id="emptyCreateBtn">Создать первый проект</button>
                </div>
            `;
            const emptyBtn = document.getElementById('emptyCreateBtn');
            if (emptyBtn) emptyBtn.addEventListener('click', window.openProjectModal);
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
                        ${projects.map(project => `
                            <tr>
                                <td>${project.id}</td>
                                <td class="project-icon">${getProjectTypeIcon(project.name)}</td>
                                <td class="project-name">${project.name}</td>
                                <td>
                                    ${project.images && project.images.length > 0 ? `
                                        <div class="image-preview">
                                            ${project.images.slice(0, 2).map(img => `
                                                <img src="${img}" alt="" class="thumbnail" onerror="this.style.display='none'" />
                                            `).join('')}
                                            ${project.images.length > 2 ? `<span>+${project.images.length - 2}</span>` : ''}
                                        </div>
                                    ` : `<span class="no-image">Нет фото</span>`}
                                </td>
                                <td>
                                    <button class="delete-btn" data-id="${project.id}" data-type="project">🗑️ Удалить</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        container.querySelectorAll('.delete-btn[data-type="project"]').forEach(btn => {
            btn.addEventListener('click', async function() {
                const id = parseInt(this.dataset.id);
                if (confirm('Удалить проект?')) {
                    try {
                        await ApiService.deleteProject(id);
                        showMessage('success', 'Проект удалён');
                        await loadData();
                        renderTab('projects');
                    } catch (error) {
                        showMessage('error', 'Ошибка удаления');
                    }
                }
            });
        });
    }

    function renderRequests() {
        const container = document.getElementById('requestsList');
        if (!container) return;

        if (requests.length === 0) {
            container.innerHTML = `<div class="empty-state">Нет заявок</div>`;
            return;
        }

        container.innerHTML = `
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Юзернейм</th>
                            <th>Тип связи</th>
                            <th>Дата</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${requests.map(req => `
                            <tr>
                                <td>${req.id}</td>
                                <td>${req.name}</td>
                                <td>${req.username}</td>
                                <td>
                                    <span class="request-type ${req.requestType === 'TG' ? 'telegram' : 'vkontakte'}">
                                        ${req.requestType === 'TG' ? 'Telegram' : 'ВКонтакте'}
                                    </span>
                                </td>
                                <td>${new Date(req.createAt).toLocaleDateString('ru-RU')}</td>
                                <td>
                                    <button class="delete-btn" data-id="${req.id}" data-type="request">🗑️ Удалить</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        container.querySelectorAll('.delete-btn[data-type="request"]').forEach(btn => {
            btn.addEventListener('click', async function() {
                const id = parseInt(this.dataset.id);
                if (confirm('Удалить заявку?')) {
                    try {
                        await ApiService.deleteRequest(id);
                        showMessage('success', 'Заявка удалена');
                        await loadData();
                        renderTab('requests');
                    } catch (error) {
                        showMessage('error', 'Ошибка удаления');
                    }
                }
            });
        });
    }

    function renderReviews() {
        const container = document.getElementById('reviewsList');
        if (!container) return;

        if (reviews.length === 0) {
            container.innerHTML = `<div class="empty-state">Нет отзывов</div>`;
            return;
        }

        container.innerHTML = `
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Отзыв</th>
                            <th>Дата</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reviews.map(review => `
                            <tr>
                                <td>${review.id}</td>
                                <td>${review.name}</td>
                                <td class="review-text">${review.review}</td>
                                <td>${new Date(review.createAt).toLocaleDateString('ru-RU')}</td>
                                <td>
                                    <button class="delete-btn" data-id="${review.id}" data-type="review">🗑️ Удалить</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        container.querySelectorAll('.delete-btn[data-type="review"]').forEach(btn => {
            btn.addEventListener('click', async function() {
                const id = parseInt(this.dataset.id);
                if (confirm('Удалить отзыв?')) {
                    try {
                        await ApiService.deleteReview(id);
                        showMessage('success', 'Отзыв удалён');
                        await loadData();
                        renderTab('reviews');
                    } catch (error) {
                        showMessage('error', 'Ошибка удаления');
                    }
                }
            });
        });
    }

    // ===== ВЫХОД =====
    function setupLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                try {
                    localStorage.removeItem('adminAuthenticated');
                } catch(e) {}
                window.location.reload();
            });
        }
    }

    // ===== СООБЩЕНИЯ =====
    function showMessage(type, text) {
        const el = document.getElementById('message');
        if (!el) return;
        el.className = `message ${type}`;
        el.textContent = text;
        el.style.display = 'block';
        clearTimeout(el._timeout);
        el._timeout = setTimeout(() => {
            el.style.display = 'none';
        }, 3000);
    }
    window.showMessage = showMessage;

    // ===== МОДАЛЬНЫЕ ОКНА =====
    function setupModals() {
        const modal = document.getElementById('projectModal');
        const openBtn = document.getElementById('createProjectBtn');
        const closeBtn = document.getElementById('closeProjectModal');
        const cancelBtn = document.getElementById('cancelProjectBtn');
        const submitBtn = document.getElementById('submitProjectBtn');
        const nameInput = document.getElementById('projectName');
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
                if (nameInput) nameInput.value = '';
                if (imagesInput) imagesInput.value = '';
                updatePreview();
            }
        }

        if (openBtn) openBtn.addEventListener('click', window.openProjectModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) closeModal();
            });
        }

        if (nameInput) nameInput.addEventListener('input', updatePreview);
        if (imagesInput) imagesInput.addEventListener('change', updatePreview);

        function updatePreview() {
            const name = nameInput ? nameInput.value.trim() : '';
            const files = imagesInput ? imagesInput.files : null;
            const previewName = document.getElementById('previewName');
            const previewIcon = document.getElementById('previewIcon');
            const previewCount = document.getElementById('previewCount');
            const imageArea = document.getElementById('previewImageArea');

            if (previewName) previewName.textContent = name || 'Название проекта';
            if (previewIcon) previewIcon.textContent = getProjectTypeIcon(name || 'проект');

            if (files && files.length > 0 && imageArea) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imageArea.innerHTML = `
                        <img src="${e.target.result}" alt="Preview" style="width:100%;height:100%;object-fit:cover;" />
                    `;
                };
                reader.readAsDataURL(files[0]);
                if (previewCount) {
                    previewCount.textContent = `${files.length} ${files.length === 1 ? 'изображение' : files.length < 5 ? 'изображения' : 'изображений'}`;
                }
            } else if (imageArea) {
                imageArea.innerHTML = `
                    <div class="card-image-placeholder">
                        <span>🖼️</span>
                        <p>Изображения не выбраны</p>
                    </div>
                `;
                if (previewCount) previewCount.textContent = '0 изображений';
            }
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', async function() {
                const name = nameInput ? nameInput.value.trim() : '';
                const files = imagesInput ? imagesInput.files : null;

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
                    console.error('Create error:', error);
                    showMessage('error', 'Ошибка создания проекта: ' + error.message);
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Создать';
                }
            });
        }

        updatePreview();
    }

    // ===== ВСЕ КНОПКИ =====
    function initButtons() {
        const emptyBtn = document.getElementById('emptyCreateBtn');
        if (emptyBtn) {
            emptyBtn.addEventListener('click', window.openProjectModal);
        }
    }

    // ===== УТИЛИТЫ =====
    function getProjectTypeIcon(name) {
        const lower = name.toLowerCase();
        if (lower.includes('лендинг') || lower.includes('landing')) return '📄';
        if (lower.includes('платформ') || lower.includes('platform')) return '⚙️';
        if (lower.includes('мобильн') || lower.includes('mobile')) return '📱';
        return '🌐';
    }

    // ===== ДОБАВЛЯЕМ МЕТОДЫ В API =====
    ApiService.deleteProject = async function(id) {
        try {
            const response = await fetch(`${ADMIN_API_BASE}/project/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                const projects = getData(STORAGE_KEYS.PROJECTS, []);
                const filtered = projects.filter(p => p.id !== id);
                setData(STORAGE_KEYS.PROJECTS, filtered);
                return true;
            }
            throw new Error(`Failed to delete project: ${response.status}`);
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    };

    ApiService.deleteRequest = async function(id) {
        try {
            const response = await fetch(`${ADMIN_API_BASE}/request/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                const requests = getData(STORAGE_KEYS.REQUESTS, []);
                const filtered = requests.filter(r => r.id !== id);
                setData(STORAGE_KEYS.REQUESTS, filtered);
                return true;
            }
            throw new Error(`Failed to delete request: ${response.status}`);
        } catch (error) {
            console.error('Error deleting request:', error);
            throw error;
        }
    };

    ApiService.deleteReview = async function(id) {
        try {
            const response = await fetch(`${ADMIN_API_BASE}/reviews/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                const reviews = getData(STORAGE_KEYS.REVIEWS, []);
                const filtered = reviews.filter(r => r.id !== id);
                setData(STORAGE_KEYS.REVIEWS, filtered);
                return true;
            }
            throw new Error(`Failed to delete review: ${response.status}`);
        } catch (error) {
            console.error('Error deleting review:', error);
            throw error;
        }
    };

    ApiService.createProject = async function(name, images) {
        try {
            const formData = new FormData();
            formData.append('name', name);
            if (images && images.length > 0) {
                Array.from(images).forEach(file => {
                    formData.append('images', file);
                });
            }

            const response = await fetch(`${ADMIN_API_BASE}/project`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                const projects = getData(STORAGE_KEYS.PROJECTS, []);
                projects.push(data);
                setData(STORAGE_KEYS.PROJECTS, projects);
                return data;
            }

            const errorText = await response.text();
            throw new Error(`Failed to create project: ${response.status} - ${errorText}`);
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    };

    // ===== ЗАПУСК =====
    checkAuth();
});