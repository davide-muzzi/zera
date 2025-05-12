<template>
<div class="flex min-h-screen gap-6 bg-gray-900 p-4 font-sans text-white">
  <!-- Sidebar -->
  <div class="flex flex-col justify-between rounded-2xl border-2 border-purple-600 bg-gray-800 p-4">
    <div class="flex flex-col gap-4">
      <button class="rounded-xl bg-black p-2">🔔</button>
      <button class="rounded-xl bg-purple-600 p-2">🏠</button>
      <button class="rounded-xl bg-black p-2">📅</button>
      <button class="rounded-xl bg-black p-2">📂</button>
      <button class="rounded-xl bg-black p-2">⚙️</button>
    </div>
    <button class="rounded-xl bg-black p-2">⏏️</button>
  </div>

  <!-- Main Content -->
  <div class="flex w-full gap-6">
    <!-- Main Section (Calendar, Start Shift, Earnings) -->
    <div class="flex w-full flex-col gap-6">
      <!-- Title -->
      <h1 class="text-4xl font-bold">ZERA</h1>

      <!-- Upper Section -->
      <div class="grid grid-cols-3 gap-6">
        <!-- Calendar -->
        <div class="col-span-2 rounded-xl bg-gray-800 p-4">
          <h2 class="text-lg text-gray-300">March, 2025</h2>
          <div class="mt-4 grid grid-cols-7 gap-1 text-center text-sm text-gray-400">
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
            <div>SUN</div>
            <div class="col-span-6"></div>
            <div class="text-white">01</div>
            <div>03</div>
            <div>04</div>
            <div>05</div>
            <div>06</div>
            <div>07</div>
            <div>08</div>
            <div>09</div>
            <div class="rounded-full bg-purple-700 text-white">10</div>
            <div class="rounded-full bg-purple-700 text-white">11</div>
            <div class="rounded-full bg-purple-700 text-white">12</div>
            <div class="rounded-full bg-purple-700 text-white">13</div>
            <div>14</div>
            <div>15</div>
            <div>16</div>
            <div>17</div>
            <div>18</div>
            <div>19</div>
            <div>20</div>
            <div>21</div>
            <div>22</div>
            <div>23</div>
            <div>24</div>
            <div>25</div>
            <div class="rounded-full bg-purple-700 text-white">26</div>
            <div class="rounded-full bg-purple-700 text-white">27</div>
            <div>28</div>
            <div class="rounded-full bg-purple-700 text-white">29</div>
            <div>30</div>
            <div>31</div>
          </div>
        </div>

        <!-- Start Shift -->
        <div class="from-black-50 flex items-center justify-center rounded-xl bg-gradient-to-b to-purple-600 text-2xl font-bold">
          START <br />
          SHIFT
        </div>
      </div>

      <!-- Earnings -->
      <div class="grid grid-cols-2 gap-6">
        <div class="from-black-50 col-span-2 flex items-end justify-between rounded-xl bg-gradient-to-r to-purple-600 p-6">
          <div>
            <p class="text-xl font-bold">Estimated Earnings</p>
            <p class="text-sm text-gray-200">for the Month of March</p>
            <p class="mt-2 inline-block rounded bg-gray-700 px-2 py-1 text-sm">Hourly Pay: 20$ ✎</p>
          </div>
          <div class="text-right">
            <p class="text-xl">75h/</p>
            <p class="text-4xl font-bold">1’500$</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Full-height Upcoming Session -->
    <div class="flex h-[calc(100vh-2rem)] w-[250px] flex-col justify-between rounded-xl bg-gray-800 p-4 text-sm">
      <div>
        <h3 class="text-gray-400">Upcoming Session:</h3>
        <p class="text-xl font-bold">MONDAY</p>
        <p class="text-gray-400">24.03.25</p>
      </div>
      <div class="mt-4">
        <p class="text-gray-400">Start:</p>
        <p class="text-xl font-semibold">13:00 - 22:00</p>
      </div>
    </div>
  </div>
</div>
</template>