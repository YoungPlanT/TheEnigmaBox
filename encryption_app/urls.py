from django.urls import path
from . import views

urlpatterns  = [
    path('', views.index, name='index'),
    path('encrypt/', views.encrypted_view, name='encrypt'),
    path('cryptoanalysisCaesarCipher/', views.cryptanalysis_view, name='cryptoanalysisCaesarCipher'),
]