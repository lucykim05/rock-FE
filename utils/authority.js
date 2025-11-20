export function isAdmin(interaction) {
  return (
    interaction.member.permissions.has('Administrator') ||
    interaction.user.id === interaction.guild.ownerId
  );
}
