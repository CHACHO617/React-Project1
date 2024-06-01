namespace React_Project1.Models
{
    public static class GlobalUser
    {
        private static string _email;

        public static string Email
        {
            get => _email;
            set => _email = value;
        }

        public static void Clear()
        {
            _email = null;
        }
    }
}
