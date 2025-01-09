<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white shadow p-4 flex justify-between items-center">
      <NuxtLink to="/welcome" class="text-xl font-bold">My Project</NuxtLink>
      <div class="flex space-x-6">
        <NuxtLink to="/cards" class="text-gray-700 hover:text-gray-900 font-medium">Cards</NuxtLink>
        <NuxtLink to="/chart" class="text-gray-700 hover:text-gray-900 font-medium">Chart</NuxtLink>
        <NuxtLink to="/profile" class="text-gray-700 hover:text-gray-900 font-medium">Profile</NuxtLink>
        <NuxtLink to="/about" class="text-gray-700 hover:text-gray-900 font-medium">About</NuxtLink>
      </div>
      <button
        @click="handleLogout"
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </nav>

    <!-- Create Card Section -->
    <div class="bg-white shadow-md p-6 mt-6 mx-4 rounded-md">
      <h1 class="text-2xl font-bold text-gray-800">Welcome to the Cards Page</h1>
      <p class="text-gray-600 mt-2">
        Want to post your own card? Click the button below to get started!
      </p>
      <div class="mt-4">
        <button
          @click="showCreateCardModal = true"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Card
        </button>
      </div>
    </div>

    <!-- Cards List -->
    <div class="p-4 space-y-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class="bg-white shadow-md rounded-md p-6"
      >
        <h2 class="text-xl font-bold text-gray-800">{{ card.title }}</h2>
        <p class="text-gray-700 mt-2">{{ card.description }}</p>

        <!-- Render Image if it exists -->
        <img
          v-if="card.image"
          :src="card.image"
          alt="Card Image"
          class="w-full h-64 object-cover rounded-md mt-4"
        />

        <p class="text-sm text-gray-500 mt-4">
          Posted by <span class="font-semibold">{{ card.username }}</span> on {{ card.datePosted }}
        </p>
        <p class="text-sm text-gray-500">
          Date: <span class="font-semibold">{{ card.date }}</span> | Time: <span class="font-semibold">{{ card.time }}</span>
        </p>
        <p class="text-sm text-gray-500">
          Price: <span class="font-semibold">{{ card.price }}</span> | Location: <span class="font-semibold">{{ card.location }}</span>
        </p>

        <!-- Edit/Delete Actions -->
        <div v-if="card.userId === currentUserId" class="mt-4 flex space-x-4">
          <button
            @click="editCard(card)"
            class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            @click="deleteCard(card.id)"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>

                  <!-- Add Like/Dislike Buttons -->
<div class="mt-4 flex items-center space-x-6">
  <button
    @click="toggleLike(card.id)"
    :class="{
      'bg-blue-500 text-white': card.likes.includes(currentUserId),
      'bg-gray-200 text-gray-700': !card.likes.includes(currentUserId),
    }"
    class="px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white"
  >
    Like ({{ card.likes.length }})
  </button>
  <button
    @click="toggleDislike(card.id)"
    :class="{
      'bg-red-500 text-white': card.dislikes.includes(currentUserId),
      'bg-gray-200 text-gray-700': !card.dislikes.includes(currentUserId),
    }"
    class="px-4 py-2 rounded-md hover:bg-red-600 hover:text-white"
  >
    Dislike ({{ card.dislikes.length }})
  </button>
</div>

<button
  v-if="card.userId !== currentUserId"
  @click="addToChart(card)"
  class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
>
  Add to Chart
</button>


        <!-- Comments Section -->
        <div class="mt-6">
          <h3 class="text-lg font-bold">Comments</h3>

          <!-- Display Comments -->
          <div v-for="comment in card.comments" :key="comment.id" class="mt-4 ml-4">
            <p>
              <span class="font-semibold">{{ comment.username }}</span>: {{ comment.text }}
            </p>

            <!-- Replies -->
            <div v-for="reply in comment.replies" :key="reply.id" class="mt-2 ml-4 border-l-2 border-gray-200 pl-4">
              <p>
                <span class="font-semibold">{{ reply.username }}</span>: {{ reply.text }}
              </p>
            </div>

            <!-- Reply Form -->
            <form @submit.prevent="addReply(card.id, comment.id)" class="mt-2 flex space-x-2">
              <input
                v-model="replyData[comment.id]"
                type="text"
                placeholder="Write a reply..."
                class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
              />
              <button
                type="submit"
                class="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Reply
              </button>
            </form>
          </div>

          <!-- Add Comment -->
          <form @submit.prevent="addComment(card.id)" class="mt-4">
            <input
              v-model="commentData[card.id]"
              type="text"
              placeholder="Add a comment..."
              class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
            />
            <button
              type="submit"
              class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Create/Edit Card Modal -->
    <div
      v-if="showCreateCardModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-md w-full max-w-lg">
        <h3 class="text-xl font-bold mb-4">{{ isEditing ? "Edit Card" : "Create a Card" }}</h3>
        <form @submit.prevent="isEditing ? updateCard() : createCard()">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input v-model="cardData.title" type="text" class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="cardData.description" class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Image URL</label>
            <input v-model="cardData.image" type="text" class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Date</label>
            <input v-model="cardData.date" type="date" class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Time</label>
            <input v-model="cardData.time" type="time" class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Price</label>
            <input v-model="cardData.price" type="number" class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Location</label>
            <input v-model="cardData.location" type="text" class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500" />
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from "#app";
import { ref, onMounted } from "vue";
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc, arrayUnion } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const { $auth, $db } = useNuxtApp();
const router = useRouter();

const cards = ref([]);
const cardData = ref({
  title: "",
  description: "",
  image: "",
  date: "",
  time: "",
  price: "",
  location: "",
});
const commentData = ref({});
const replyData = ref({});
const showCreateCardModal = ref(false);
const isEditing = ref(false);
const currentCardId = ref(null);
const currentUserId = ref("");

const fetchCards = async () => {
  const querySnapshot = await getDocs(collection($db, "cards"));
  cards.value = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const cardData = doc.data();
      const commentsSnapshot = await getDocs(collection($db, "cards", doc.id, "comments"));
      const comments = commentsSnapshot.docs.map((commentDoc) => ({
        id: commentDoc.id,
        ...commentDoc.data(),
      }));
      return {
        id: doc.id,
        ...cardData,
        likes: Array.isArray(cardData.likes) ? cardData.likes : [], // Default to empty array
        dislikes: Array.isArray(cardData.dislikes) ? cardData.dislikes : [], // Default to empty array
        comments,
      };
    })
  );
};

const toggleLike = async (cardId) => {
  const cardRef = doc($db, "cards", cardId);
  const card = cards.value.find((c) => c.id === cardId);
  if (!card) return;

  if (card.likes.includes(currentUserId.value)) {
    // Remove like
    await updateDoc(cardRef, {
      likes: card.likes.filter((id) => id !== currentUserId.value),
    });
  } else {
    // Add like and remove dislike if exists
    await updateDoc(cardRef, {
      likes: arrayUnion(currentUserId.value),
      dislikes: card.dislikes.filter((id) => id !== currentUserId.value),
    });
  }
  await fetchCards();
};

const toggleDislike = async (cardId) => {
  const cardRef = doc($db, "cards", cardId);
  const card = cards.value.find((c) => c.id === cardId);
  if (!card) return;

  if (card.dislikes.includes(currentUserId.value)) {
    // Remove dislike
    await updateDoc(cardRef, {
      dislikes: card.dislikes.filter((id) => id !== currentUserId.value),
    });
  } else {
    // Add dislike and remove like if exists
    await updateDoc(cardRef, {
      dislikes: arrayUnion(currentUserId.value),
      likes: card.likes.filter((id) => id !== currentUserId.value),
    });
  }
  await fetchCards();
};

const addToChart = (card) => {
  const chart = JSON.parse(localStorage.getItem("chart")) || [];
  const existingCard = chart.find((item) => item.id === card.id);

  if (existingCard) {
    existingCard.quantity += 1; // Increment quantity if card already exists
  } else {
    chart.push({ ...card, quantity: 1 }); // Add card with initial quantity
  }

  localStorage.setItem("chart", JSON.stringify(chart)); // Save updated chart to localStorage
  alert("Card added to your chart!");
};



const createCard = async () => {
  const user = $auth.currentUser;
  if (!user) return;

  const newCard = {
    ...cardData.value,
    username: user.displayName || "Anonymous",
    userId: user.uid,
    datePosted: new Date().toLocaleString(),
    likes: [], // Initialize likes as an empty array
    dislikes: [], // Initialize dislikes as an empty array
  };

  await addDoc(collection($db, "cards"), newCard);
  closeModal();
  await fetchCards();
};

const editCard = (card) => {
  cardData.value = { ...card };
  currentCardId.value = card.id;
  isEditing.value = true;
  showCreateCardModal.value = true;
};

const updateCard = async () => {
  const cardRef = doc($db, "cards", currentCardId.value);
  await updateDoc(cardRef, { ...cardData.value });
  closeModal();
  await fetchCards();
};

const deleteCard = async (id) => {
  const cardRef = doc($db, "cards", id);
  await deleteDoc(cardRef);
  await fetchCards();
};

const addComment = async (cardId) => {
  const user = $auth.currentUser;
  if (!user) return;

  const commentText = commentData.value[cardId];
  if (!commentText) return;

  const commentRef = collection($db, "cards", cardId, "comments");
  await addDoc(commentRef, {
    text: commentText,
    username: user.displayName || "Anonymous",
    replies: [],
  });

  commentData.value[cardId] = ""; // Clear input
  await fetchCards();
};

const addReply = async (cardId, commentId) => {
  const user = $auth.currentUser;
  if (!user) return;

  const replyText = replyData.value[commentId];
  if (!replyText) return;

  const commentRef = doc($db, "cards", cardId, "comments", commentId);
  await updateDoc(commentRef, {
    replies: arrayUnion({
      text: replyText,
      username: user.displayName || "Anonymous",
    }),
  });

  replyData.value[commentId] = ""; // Clear input
  await fetchCards();
};

const closeModal = () => {
  showCreateCardModal.value = false;
  isEditing.value = false;
  currentCardId.value = null;
  cardData.value = {
    title: "",
    description: "",
    image: "",
    date: "",
    time: "",
    price: "",
    location: "",
  };
};

const handleLogout = async () => {
  try {
    await signOut($auth);
    localStorage.clear();
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};

onMounted(() => {
  const unsubscribe = onAuthStateChanged($auth, async (user) => {
    if (user) {
      currentUserId.value = user.uid;
      await fetchCards();
    } else {
      currentUserId.value = "";
    }
  });

  return () => unsubscribe();
});
</script>
