# Generated by Django 4.0.3 on 2022-04-06 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('conten', models.TextField()),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Moim',
        ),
    ]
