import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  Compass,
  ContactRound,
  Gauge,
  Goal,
  Layers3,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import {
  Accordion,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  List,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { PortfolioRouteHeader } from '../components/PortfolioRouteHeader.jsx'

export function MantinePortfolio({ content, locale, theme, onLocaleChange, onThemeChange }) {
  const isDark = theme === 'dark'
  const accent = isDark ? '#96b4ff' : '#274874'
  const softPanel = isDark ? '#16263e' : '#eef4ff'
  const cardBg = isDark ? '#132033' : '#ffffff'
  const navItems = [
    { href: '#mantine-overview', label: content.nav.about },
    { href: '#mantine-method', label: content.nav.methodology },
    { href: '#mantine-services', label: content.nav.services },
    { href: '#mantine-contact', label: content.nav.contact },
  ]

  return (
    <>
      <PortfolioRouteHeader
        content={content}
        locale={locale}
        theme={theme}
        onLocaleChange={onLocaleChange}
        onThemeChange={onThemeChange}
        navItems={navItems}
      />

      <Box px={{ base: 16, sm: 24, lg: 40 }} pb={60}>
        <Container size="xl">
          <Paper
            id="mantine-overview"
            radius={34}
            p={{ base: 22, md: 38 }}
            style={{
              background: isDark
                ? 'linear-gradient(145deg, #0f1828 0%, #16263e 55%, #1f3557 100%)'
                : 'linear-gradient(145deg, #f8fbff 0%, #eaf2ff 52%, #d5e5ff 100%)',
              border: `1px solid ${isDark ? 'rgba(150,180,255,0.14)' : 'rgba(39,72,116,0.08)'}`,
            }}
          >
            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
              <Stack gap="xl">
                <Group justify="space-between" align="center">
                  <Badge size="lg" radius="xl" color={isDark ? 'indigo' : 'blue'} variant="light">
                    {content.selector.designs[1].title}
                  </Badge>
                  <ThemeIcon size={54} radius="xl" variant="light" color={isDark ? 'indigo' : 'blue'}>
                    <Layers3 size={26} />
                  </ThemeIcon>
                </Group>

                <div>
                  <Text size="sm" tt="uppercase" fw={800} c={isDark ? '#b4c9f4' : '#466693'} mb="md">
                    {content.hero.eyebrow}
                  </Text>
                  <Title order={1} size="h1" c={isDark ? '#f5f8ff' : '#102544'} style={{ lineHeight: 1.02, maxWidth: 660 }}>
                    {content.hero.title}
                  </Title>
                  <Text mt="lg" size="lg" c={isDark ? 'rgba(233,239,250,0.84)' : 'rgba(16,37,68,0.72)'} maw={650}>
                    {content.hero.description}
                  </Text>
                </div>

                <Group>
                  <Button
                    size="md"
                    radius="xl"
                    rightSection={<ArrowRight size={16} />}
                    color={isDark ? 'indigo' : 'dark'}
                  >
                    {content.services.extendedSupportCta}
                  </Button>
                  <Button size="md" radius="xl" variant="default" color={isDark ? 'gray' : 'dark'}>
                    {content.hero.secondaryCta}
                  </Button>
                </Group>
              </Stack>

              <Stack gap="md">
                <Card radius={28} padding="xl" bg={isDark ? 'rgba(14,24,39,0.72)' : 'rgba(255,255,255,0.74)'} style={{ backdropFilter: 'blur(14px)' }}>
                  <Group justify="space-between" align="flex-start">
                    <div>
                      <Text size="xs" tt="uppercase" fw={800} c={isDark ? '#b4c9f4' : '#4a5d8b'}>
                        {content.hero.brandMarkTitle}
                      </Text>
                      <Title order={3} mt="sm" c={isDark ? '#f5f8ff' : '#102544'}>
                        {content.hero.highlights[0].value}
                      </Title>
                    </div>
                    <img src="/amc1.png" alt={content.brand.silverLogoAlt} style={{ width: 72, height: 72, objectFit: 'contain' }} />
                  </Group>
                  <Divider my="lg" color={isDark ? 'rgba(180,201,244,0.18)' : 'rgba(39,72,116,0.1)'} />
                  <SimpleGrid cols={3} spacing="sm">
                    {content.hero.stats.map((item) => (
                      <div key={item.value}>
                        <Text fw={800} c={accent}>{item.value}</Text>
                        <Text size="xs" c={isDark ? 'rgba(233,239,250,0.7)' : 'rgba(16,37,68,0.64)'}>{item.label}</Text>
                      </div>
                    ))}
                  </SimpleGrid>
                </Card>

                <SimpleGrid cols={2} spacing="md">
                  {content.hero.highlights.map((item, index) => (
                    <Paper key={item.label} radius={24} p="lg" bg={index === 0 ? softPanel : cardBg} style={{ border: `1px solid ${isDark ? 'rgba(150,180,255,0.12)' : 'rgba(39,72,116,0.08)'}` }}>
                      <Group gap="sm" mb="sm">
                        <ThemeIcon radius="xl" variant="light" color={isDark ? 'indigo' : 'blue'}>
                          {index === 0 ? <Gauge size={18} /> : <BadgeCheck size={18} />}
                        </ThemeIcon>
                        <Text fw={700} c={accent}>{item.label}</Text>
                      </Group>
                      <Text size="sm" c={isDark ? 'rgba(233,239,250,0.78)' : 'rgba(16,37,68,0.72)'}>{item.value}</Text>
                    </Paper>
                  ))}
                </SimpleGrid>
              </Stack>
            </SimpleGrid>
          </Paper>

          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl" mt={34}>
            <Paper radius={30} p="xl" bg={cardBg} shadow="sm" style={{ border: `1px solid ${isDark ? 'rgba(150,180,255,0.08)' : 'rgba(39,72,116,0.06)'}` }}>
              <Group justify="space-between" mb="lg">
                <div>
                  <Text size="sm" tt="uppercase" fw={800} c={accent}>
                    {content.about.badge}
                  </Text>
                  <Title order={2} mt="sm" c={isDark ? '#f5f8ff' : '#102544'}>
                    {content.about.title}
                  </Title>
                </div>
                <ThemeIcon size={56} radius="xl" variant="light" color={isDark ? 'indigo' : 'blue'}>
                  <BookOpenText size={28} />
                </ThemeIcon>
              </Group>

              <Tabs defaultValue="about" radius="xl" variant="pills" color={isDark ? 'indigo' : 'dark'}>
                <Tabs.List grow>
                  <Tabs.Tab value="about">{content.nav.about}</Tabs.Tab>
                  <Tabs.Tab value="vision">{content.about.visionTitle}</Tabs.Tab>
                  <Tabs.Tab value="mission">{content.about.missionTitle}</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="about" pt="lg">
                  <Stack gap="md">
                    {content.about.paragraphs.map((paragraph) => (
                      <Text key={paragraph} c={isDark ? 'rgba(233,239,250,0.82)' : 'rgba(16,37,68,0.76)'}>
                        {paragraph}
                      </Text>
                    ))}
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="vision" pt="lg">
                  <Paper radius={24} p="lg" bg={softPanel}>
                    <Text c={isDark ? 'rgba(233,239,250,0.84)' : 'rgba(16,37,68,0.78)'}>{content.about.visionText}</Text>
                  </Paper>
                </Tabs.Panel>

                <Tabs.Panel value="mission" pt="lg">
                  <Paper radius={24} p="lg" bg={softPanel}>
                    <Text c={isDark ? 'rgba(233,239,250,0.84)' : 'rgba(16,37,68,0.78)'}>{content.about.missionText}</Text>
                  </Paper>
                </Tabs.Panel>
              </Tabs>
            </Paper>

            <Paper id="mantine-method" radius={30} p="xl" bg={softPanel} shadow="sm" style={{ border: `1px solid ${isDark ? 'rgba(150,180,255,0.1)' : 'rgba(39,72,116,0.06)'}` }}>
              <Group justify="space-between" mb="lg">
                <div>
                  <Text size="sm" tt="uppercase" fw={800} c={accent}>
                    {content.methodology.badge}
                  </Text>
                  <Title order={2} mt="sm" c={isDark ? '#f5f8ff' : '#102544'}>
                    {content.methodology.title}
                  </Title>
                </div>
                <ThemeIcon size={56} radius="xl" variant="light" color={isDark ? 'indigo' : 'blue'}>
                  <Workflow size={26} />
                </ThemeIcon>
              </Group>

              <Stack gap="md">
                {content.methodology.steps.map((step, index) => (
                  <Paper key={step.step} radius={24} p="lg" bg={cardBg}>
                    <Group justify="space-between" align="flex-start">
                      <div>
                        <Text size="xs" tt="uppercase" fw={800} c={accent}>
                          {content.methodology.stepLabel} {index + 1}
                        </Text>
                        <Title order={4} mt="xs" c={isDark ? '#f5f8ff' : '#102544'}>
                          {step.title}
                        </Title>
                      </div>
                      <Badge radius="xl" variant="light" color={isDark ? 'indigo' : 'blue'}>
                        {step.step}
                      </Badge>
                    </Group>
                    <Text mt="md" c={isDark ? 'rgba(233,239,250,0.8)' : 'rgba(16,37,68,0.74)'}>
                      {step.description}
                    </Text>
                    <Progress mt="lg" radius="xl" size="lg" value={((index + 1) / content.methodology.steps.length) * 100} color={isDark ? 'indigo' : 'dark'} />
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </SimpleGrid>

          <SimpleGrid id="mantine-services" cols={{ base: 1, lg: 2 }} spacing="xl" mt={34}>
            <Paper radius={30} p="xl" bg={cardBg} shadow="sm" style={{ border: `1px solid ${isDark ? 'rgba(150,180,255,0.08)' : 'rgba(39,72,116,0.06)'}` }}>
              <Text size="sm" tt="uppercase" fw={800} c={accent}>
                {content.services.badge}
              </Text>
              <Title order={2} mt="sm" c={isDark ? '#f5f8ff' : '#102544'}>
                {content.services.title}
              </Title>
              <Text mt="md" c={isDark ? 'rgba(233,239,250,0.82)' : 'rgba(16,37,68,0.76)'}>
                {content.services.intro}
              </Text>

              <Accordion mt="xl" radius="xl" variant="separated" chevronPosition="right">
                {content.services.cards.map((service, index) => {
                  const icons = [Building2, Compass, BriefcaseBusiness]
                  const Icon = icons[index]

                  return (
                    <Accordion.Item key={service.title} value={service.title}>
                      <Accordion.Control icon={<ThemeIcon radius="xl" variant="light" color={isDark ? 'indigo' : 'blue'}><Icon size={18} /></ThemeIcon>}>
                        <Text fw={700}>{service.title}</Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Text c={isDark ? 'rgba(233,239,250,0.8)' : 'rgba(16,37,68,0.74)'}>{service.description}</Text>
                        <Paper mt="md" radius={20} p="md" bg={softPanel}>
                          <Text size="xs" tt="uppercase" fw={800} c={accent}>{content.services.impactLabel}</Text>
                          <Text mt="xs" c={isDark ? '#f5f8ff' : '#102544'}>{service.outcome}</Text>
                        </Paper>
                      </Accordion.Panel>
                    </Accordion.Item>
                  )
                })}
              </Accordion>
            </Paper>

            <Paper radius={30} p="xl" bg={softPanel} shadow="sm" style={{ border: `1px solid ${isDark ? 'rgba(150,180,255,0.1)' : 'rgba(39,72,116,0.06)'}` }}>
              <Group justify="space-between" mb="lg">
                <div>
                  <Text size="sm" tt="uppercase" fw={800} c={accent}>
                    {content.principles.badge}
                  </Text>
                  <Title order={2} mt="sm" c={isDark ? '#f5f8ff' : '#102544'}>
                    {content.principles.title}
                  </Title>
                </div>
                <ThemeIcon size={56} radius="xl" variant="light" color={isDark ? 'indigo' : 'blue'}>
                  <ShieldCheck size={26} />
                </ThemeIcon>
              </Group>

              <List
                spacing="md"
                icon={<ThemeIcon radius="xl" variant="light" color={isDark ? 'indigo' : 'blue'}><Goal size={16} /></ThemeIcon>}
              >
                {content.principles.items.map((item) => (
                  <List.Item key={item.title}>
                    <Text fw={700} c={isDark ? '#f5f8ff' : '#102544'}>{item.title}</Text>
                    <Text size="sm" c={isDark ? 'rgba(233,239,250,0.78)' : 'rgba(16,37,68,0.72)'}>{item.description}</Text>
                  </List.Item>
                ))}
              </List>
            </Paper>
          </SimpleGrid>

          <Paper id="mantine-contact" radius={32} p={{ base: 24, md: 34 }} mt={34} bg={isDark ? '#10203a' : '#102544'} style={{ color: '#f5f8ff' }}>
            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
              <div>
                <Text size="sm" tt="uppercase" fw={800} c="rgba(245,248,255,0.72)">
                  {content.contact.badge}
                </Text>
                <Title order={2} mt="sm" c="white">
                  {content.contact.title}
                </Title>
                <Text mt="lg" c="rgba(245,248,255,0.82)">{content.contact.description}</Text>
                <Group mt="xl">
                  <Button radius="xl" leftSection={<PhoneCall size={16} />} color="gray" variant="white" component="a" href={`tel:${content.contactData.phone.replace(/-/g, '')}`}>
                    {content.contactData.phone}
                  </Button>
                  <Button radius="xl" variant="outline" color="gray" component="a" href={`mailto:${content.contactData.email}`}>
                    {content.contactData.email}
                  </Button>
                </Group>
              </div>

              <Paper radius={26} p="xl" bg="rgba(255,255,255,0.08)">
                <Group justify="space-between" align="center">
                  <ThemeIcon size={52} radius="xl" variant="light" color="gray">
                    <ContactRound size={24} />
                  </ThemeIcon>
                  <img src="/amc1.png" alt={content.brand.silverLogoAlt} style={{ width: 68, height: 68, objectFit: 'contain' }} />
                </Group>
                <Title order={3} mt="lg" c="white">{content.contact.finalPrincipleText}</Title>
                <Text mt="md" c="rgba(245,248,255,0.82)">{content.methodology.beliefText}</Text>
                <Divider my="lg" color="rgba(255,255,255,0.12)" />
                <Stack gap="sm">
                  {content.contact.checklist.map((item) => (
                    <Group key={item} align="flex-start" wrap="nowrap">
                      <ThemeIcon radius="xl" variant="light" color="gray">
                        <Sparkles size={14} />
                      </ThemeIcon>
                      <Text c="rgba(245,248,255,0.86)">{item}</Text>
                    </Group>
                  ))}
                </Stack>
              </Paper>
            </SimpleGrid>
          </Paper>
        </Container>
      </Box>
    </>
  )
}