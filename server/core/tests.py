from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from .models import User
from rest_framework_simplejwt.tokens import AccessToken
from .models import Task

class AuthAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='testuser@gmail.com', password='testpassword', first_name="Test", last_name="Test")
        self.access_token = AccessToken.for_user(self.user)

    def test_register(self):
        data = {
            'email': 'newuser@gmail.com',
            'password': 'newpassword',
            'first_name': "New",
            'last_name': 'Name'
        }
        response = self.client.post('/auth/register', data)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        data = {
            'email': 'testuser@gmail.com',
            'password': 'testpassword',
        }
        response = self.client.post('/auth/login', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.get('/auth/profile')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        data = {
            'first_name': 'Test 2'
        }
        response = self.client.put('/auth/update', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TaskAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='testuser@gmail.com', password='testpassword', first_name="Test", last_name="Test")
        self.access_token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        self.task = Task.objects.create(user=self.user, name='Test Task', description='Test description')

    def test_list_tasks(self):
        response = self.client.get('/tasks')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_task(self):
        response = self.client.get(f'/tasks/{self.task.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_task(self):
        data = {
            'name': 'New Task',
            'description': 'Test task'
        }
        response = self.client.post('/tasks/create', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
