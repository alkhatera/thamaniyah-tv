# مرحبا 👋
هذا التطبيق للتلفاز تم صنعه لتكليف مطور تطبيقات التلفاز الخاص بثمانية

صور للمشروع:
![App Home](https://github.com/user-attachments/assets/cfe5866a-37bf-4954-8947-1585a45dc02e)
![Menu](https://github.com/user-attachments/assets/7d87dc14-3c58-41cd-82f9-92721743713d)
![Video Player](https://github.com/user-attachments/assets/974f5f07-d3b9-44ea-bb83-60e3f3524aea)
![Favorites](https://github.com/user-attachments/assets/84ef87f4-0a52-420c-bca7-c349ee17b090)
https://github.com/user-attachments/assets/4d6a0889-d822-40e1-a48d-d45033783f92


## 📚 المكتبات الرئيسية المستخدمة
- `@expo/vector-icons`: تم استخدامها للأيقونات
- `@tanstack/react-query`: تم استخدامها لتنظيم عملية تحميل المعلومات
- `expo-video`: تم استخدامها لتشغيل الفيديوات
- `react-native-reanimated`: تم استخدامها للأنميشن
- `zustand`: تم استخدامها لنقل المعلومات بين عدة ملفات

## 🙀 تحديات واجهتني
1. 🎯 إدارة التركيز (Focus)
- كان من الصعب التحكم في تنقل التركيز بين عناصر الواجهة مثل القائمة والبنر وقائمة الفيديوهات.
- الحل كان بإنشاء FocusContext مخصص لإدارة التركيز يدويًا، مما تطلب مجهودًا إضافيًا لتغطية جميع الحالات.

2. 🔄 مشاكل بعد ماقلبت التطبيق الى عربي
- استخدام FlatList مع inverted وinitialScrollIndex سبب مشاكل في قائمة الفيديوات.

3. 🎮 التعامل مع أزرار الريموت (HWEvents)
- واجهت مشاكل مثل تكرار الحدث أو تنفيذه قبل الأوان.
- استخدمت useDebouncedTVEventHandler لتقليل هذه المشاكل، لكنه احتاج ضبطًا دقيقًا.

## 🚀 كيف اشغله؟

- `cd` into the project

```sh
yarn
yarn start
a (this will install Expo Go and open it on your tv/emulator)
```
